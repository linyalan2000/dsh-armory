// Targeted regression test for the AI-assisted creation handoff.
// Run: node test/create-with-ai.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const client = readFileSync(resolve(root, 'lib/client.js'), 'utf8');
const start = client.indexOf('const CREATE_WITH_AI_PROMPTS = {');
const end = client.indexOf('const SummonQuickMenu =', start);
assert.ok(start >= 0 && end > start, 'AI creation bridge must be declared before the chat menu');
const source = client.slice(start, end);
// Only execute the self-contained handoff helpers, never the React/DSH bundle.
const makeBridge = new Function('MODULE_CTX',
  'return (function () { ' + source +
  '\nreturn { requestCreateWithAi, fillPendingCreateWithAi, peek: () => pendingCreateWithAi }; })()');
const selectedPanels = [];
const bridge = makeBridge({ ctx: { get: () => ({ selectPanel: (value) => selectedPanels.push(value) }) } });
let draft = '已有草稿';
let writes = 0;
let sends = 0;
const inputActions = {
  snapshot: { draft },
  setDraft(value) { draft = value; this.snapshot.draft = value; writes += 1; },
  send() { sends += 1; },
};
bridge.requestCreateWithAi('expert');
assert.ok(bridge.peek().includes('专属 AI 专家'), 'expert prompt should introduce the goal naturally');
assert.ok(!/plugin\.json|WORKBUDDY_CONFIG_DIR|\.workbuddy/.test(bridge.peek()), 'expert prompt should not expose implementation details');
assert.equal(bridge.fillPendingCreateWithAi(inputActions), true);
assert.ok(draft.startsWith('已有草稿\n\n'), 'the existing draft is preserved');
assert.equal(bridge.fillPendingCreateWithAi(inputActions), false, 'do not insert twice');
assert.equal(writes, 1);
bridge.requestCreateWithAi('skill');
assert.ok(bridge.peek().includes('自己的技能'), 'skill prompt should introduce the goal naturally');
assert.ok(!/SKILL\.md|frontmatter|\.agents\/skills/.test(bridge.peek()), 'skill prompt should not expose implementation details');
assert.equal(bridge.fillPendingCreateWithAi(null), false, 'do not lose pending prompt without composer access');
assert.ok(bridge.peek(), 'keep queued prompt until insertion succeeds');
assert.equal(bridge.fillPendingCreateWithAi(inputActions), true);
assert.ok(draft.includes('自己的技能'));
assert.ok(draft.includes('等我确认满意后'), 'creation must wait for user confirmation');
assert.equal(sends, 0, 'never auto-send the drafted prompt');
assert.deepEqual(selectedPanels, [null, null], 'both buttons return to conversation');
console.log('create-with-ai: all checks passed');

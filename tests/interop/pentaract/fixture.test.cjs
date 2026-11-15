// Read-only contract smoke test. No credentials, network writes, or new dependencies.
// Run: node --test tests/interop/pentaract/fixture.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const record = JSON.parse(readFileSync(join(__dirname, 'veiled-dominion.game.fixture.json'), 'utf8'));
const allowed = new Set([
  '$type', 'applicationType', 'createdAt', 'genres', 'media', 'modes', 'name',
  'parent', 'playerPerspectives', 'publishedAt', 'releases', 'summary',
  'themes', 'storyline', 'keywords', 'websites', 'videos',
  'alternativeNames', 'timeToBeat', 'ageRatings', 'languageSupports',
  'multiplayerModes', 'engines', 'externalIds', 'description',
  'descriptionFacets', 'systemRequirements', 'platformFeatures',
]);
const knownApplications = new Set([
  'addon', 'bundle', 'dlc', 'episode', 'expandedGame', 'expansion',
  'fork', 'game', 'mod', 'port', 'remake', 'remaster', 'season',
  'standaloneExpansion', 'update',
]);
// Values verified against upstream game.json and defs.json on 2026-11-15.
test('uses the upstream record NSID and required fields', () => {
  assert.equal(record.$type, 'games.gamesgamesgamesgames.game');
  assert.equal(record.name, 'Veiled Dominion');
  assert.ok(record.name.length <= 640);
  assert.ok(knownApplications.has(record.applicationType));
  assert.ok(!Number.isNaN(Date.parse(record.createdAt)));
});
test('uses only game record properties and valid public links', () => {
  for (const key of Object.keys(record)) assert.ok(allowed.has(key), 'unsupported field: ' + key);
  assert.ok(record.summary.length <= 3000);
  for (const site of record.websites ?? []) {
    assert.ok(/^https:\/\//.test(site.url));
    assert.equal(site.type, 'official');
  }
});
test('does not claim release, verified accessibility, credits, or player data', () => {
  const excluded = ['publishedAt','releases','platformFeatures','media','languageSupports','ageRatings','multiplayerModes','externalIds'];
  for (const key of excluded) assert.ok(!(key in record), 'unverified field: ' + key);
  assert.ok(!JSON.stringify(record).match(/achievement|saveData|playerDID|verifiedAccessible/i));
});

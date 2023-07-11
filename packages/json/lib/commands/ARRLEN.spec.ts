import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import ARRLEN from './ARRLEN';

describe('JSON.ARRLEN', () => {
  describe('transformArguments', () => {
    it('without path', () => {
      assert.deepEqual(
        ARRLEN.transformArguments('key'),
        ['JSON.ARRLEN', 'key']
      );
    });

    it('with path', () => {
      assert.deepEqual(
        ARRLEN.transformArguments('key', '$'),
        ['JSON.ARRLEN', 'key', '$']
      );
    });
  });

  testUtils.testWithClient('client.json.arrLen', async client => {
    await client.json.set('key', '$', []);

    assert.deepEqual(
      await client.json.arrLen('key', '$'),
      [0]
    );
  }, GLOBAL.SERVERS.OPEN);
});

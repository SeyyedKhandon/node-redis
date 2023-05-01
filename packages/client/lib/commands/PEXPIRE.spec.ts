import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import PEXPIRE from './PEXPIRE';

describe('PEXPIRE', () => {
  describe('transformArguments', () => {
    it('simple', () => {
      assert.deepEqual(
        PEXPIRE.transformArguments('key', 1),
        ['PEXPIRE', 'key', '1']
      );
    });

    it('with set option', () => {
      assert.deepEqual(
        PEXPIRE.transformArguments('key', 1, 'GT'),
        ['PEXPIRE', 'key', '1', 'GT']
      );
    });
  });

  testUtils.testAll('pExpire', async client => {
    assert.equal(
      await client.pExpire('key', 1),
      0
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});

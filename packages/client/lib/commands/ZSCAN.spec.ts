import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import ZSCAN from './ZSCAN';

describe('ZSCAN', () => {
  describe('transformArguments', () => {
    it('cusror only', () => {
      assert.deepEqual(
        ZSCAN.transformArguments('key', '0'),
        ['ZSCAN', 'key', '0']
      );
    });

    it('with MATCH', () => {
      assert.deepEqual(
        ZSCAN.transformArguments('key', '0', {
          MATCH: 'pattern'
        }),
        ['ZSCAN', 'key', '0', 'MATCH', 'pattern']
      );
    });

    it('with COUNT', () => {
      assert.deepEqual(
        ZSCAN.transformArguments('key', '0', {
          COUNT: 1
        }),
        ['ZSCAN', 'key', '0', 'COUNT', '1']
      );
    });

    it('with MATCH & COUNT', () => {
      assert.deepEqual(
        ZSCAN.transformArguments('key', '0', {
          MATCH: 'pattern',
          COUNT: 1
        }),
        ['ZSCAN', 'key', '0', 'MATCH', 'pattern', 'COUNT', '1']
      );
    });
  });

  testUtils.testWithClient('zScan', async client => {
    assert.deepEqual(
      await client.zScan('key', '0'),
      {
        cursor: '0',
        members: []
      }
    );
  }, GLOBAL.SERVERS.OPEN);
});

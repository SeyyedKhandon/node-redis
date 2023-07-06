import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import HSCAN from './HSCAN';

describe('HSCAN', () => {
  describe('transformArguments', () => {
    it('cusror only', () => {
      assert.deepEqual(
        HSCAN.transformArguments('key', '0'),
        ['HSCAN', 'key', '0']
      );
    });

    it('with MATCH', () => {
      assert.deepEqual(
        HSCAN.transformArguments('key', '0', {
          MATCH: 'pattern'
        }),
        ['HSCAN', 'key', '0', 'MATCH', 'pattern']
      );
    });

    it('with COUNT', () => {
      assert.deepEqual(
        HSCAN.transformArguments('key', '0', {
          COUNT: 1
        }),
        ['HSCAN', 'key', '0', 'COUNT', '1']
      );
    });

    it('with MATCH & COUNT', () => {
      assert.deepEqual(
        HSCAN.transformArguments('key', '0', {
          MATCH: 'pattern',
          COUNT: 1
        }),
        ['HSCAN', 'key', '0', 'MATCH', 'pattern', 'COUNT', '1']
      );
    });
  });

  testUtils.testWithClient('client.hScan', async client => {
    const [, reply] = await Promise.all([
      client.hSet('key', 'field', 'value'),
      client.hScan('key', '0')
    ]);

    assert.deepEqual(reply, {
      cursor: '0',
      entries: [{
        field: 'field',
        value: 'value'
      }]
    });
  }, GLOBAL.SERVERS.OPEN);
});

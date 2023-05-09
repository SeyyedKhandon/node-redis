import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import XADD_NOMKSTREAM from './XADD_NOMKSTREAM';

describe('XADD NOMKSTREAM', () => {
  describe('transformArguments', () => {
    it('single field', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          field: 'value'
        }),
        ['XADD', 'key', 'NOMKSTREAM', '*', 'field', 'value']
      );
    });

    it('multiple fields', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          '1': 'I',
          '2': 'II'
        }),
        ['XADD', 'key', 'NOMKSTREAM', '*', '1', 'I', '2', 'II']
      );
    });

    it('with TRIM', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          field: 'value'
        }, {
          TRIM: {
            threshold: 1000
          }
        }),
        ['XADD', 'key', 'NOMKSTREAM', '1000', '*', 'field', 'value']
      );
    });

    it('with TRIM.strategy', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          field: 'value'
        }, {
          TRIM: {
            strategy: 'MAXLEN',
            threshold: 1000
          }
        }),
        ['XADD', 'key', 'NOMKSTREAM', 'MAXLEN', '1000', '*', 'field', 'value']
      );
    });

    it('with TRIM.strategyModifier', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          field: 'value'
        }, {
          TRIM: {
            strategyModifier: '=',
            threshold: 1000
          }
        }),
        ['XADD', 'key', 'NOMKSTREAM', '=', '1000', '*', 'field', 'value']
      );
    });

    it('with TRIM.limit', () => {
      assert.deepEqual(
        XADD_NOMKSTREAM.transformArguments('key', '*', {
          field: 'value'
        }, {
          TRIM: {
            threshold: 1000,
            limit: 1
          }
        }),
        ['XADD', 'key', 'NOMKSTREAM', '1000', 'LIMIT', '1', '*', 'field', 'value']
      );
    });
  });

  testUtils.testAll('xAddNoMkStream', async client => {
    assert.equal(
      await client.xAddNoMkStream('key', '*', {
        field: 'value'
      }),
      null
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});

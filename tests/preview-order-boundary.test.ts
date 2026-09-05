import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as identity from '../lib/preview-identity.ts';
import * as orders from '../lib/checkout-order.ts';

test('reserved preview identities survive flag off and mixed carts block before client creation', async () => {
  assert.ok(identity); assert.ok(orders);
  process.env.KABIA_BRAND_PREVIEW = '0';
  for (const key of ['id', 'slug', 'productId', 'variantId']) {
    for (const value of ['onizleme-badem', 'kabia-preview:badem']) {
      const item = { [key]: value };
      assert.equal(identity.isPreviewItem(item), true);
      let factories = 0;
      const result = await orders.submitOrder([{slug:'real'}, item], () => { factories++; throw new Error('must not create client'); }, {});
      assert.equal(result.status, 'preview_blocked');
      assert.equal(factories, 0);
    }
  }
});

test('normal order still passes its payload to create_order exactly once', async () => {
  assert.ok(orders);
  const calls: unknown[] = [];
  const payload = { p_full_name: 'Test' };
  const result = await orders.submitOrder([{slug:'kabuklu-badem'}], () => ({rpc: async (name: string, args: unknown) => { calls.push([name,args]); return {data:{order_number:'test-order'}, error:null}; }}) as never, payload);
  assert.equal(result.status, 'ok');
  assert.deepEqual(calls, [['create_order', payload]]);
});

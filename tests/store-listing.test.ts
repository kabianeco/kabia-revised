import assert from 'node:assert/strict';
import { test } from 'node:test';
const listing = await import('../lib/store-listing.ts').catch(() => null);
const products = [
  { id:'a',category:'cig-badem',source:'ciftlik',price:30 },
  { id:'b',category:'paketli-urunler',source:'secki',price:20 },
  { id:'c',category:'paketli-urunler',source:'mutfak',price:10 },
  { id:'d',category:'paketli-urunler',source:'secki',price:20 },
];
test('default preserves order, price sorts are stable and source/category pairs filter together', () => {
  assert.ok(listing);
  const ids=(s:string,c='tumu',source='tumu')=>listing.selectProducts(products as never,c,source,s).map((p:{id:string})=>p.id);
  assert.deepEqual(ids('onerilen'),['a','b','c','d']);
  assert.deepEqual(ids('fiyat-artan'),['c','b','d','a']);
  assert.deepEqual(ids('fiyat-azalan'),['a','b','d','c']);
  assert.deepEqual(ids('onerilen','paketli-urunler','secki'),['b','d']);
  assert.deepEqual(ids('onerilen','cig-badem','mutfak'),[]);
  assert.deepEqual(listing.categoryGroups(products as never).map((g:{source:string,categories:{id:string}[]})=>[g.source,g.categories.map(c=>c.id)]),[['ciftlik',['cig-badem']],['secki',['paketli-urunler']],['mutfak',['paketli-urunler']]]);
});

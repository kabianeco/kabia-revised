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
});

test('the bar offers only sources and categories the catalogue actually has', () => {
  assert.ok(listing);
  const ids = (list:{id:string}[]) => list.map(entry => entry.id);
  assert.deepEqual(ids(listing.presentSources(products as never)),['tumu','ciftlik','secki','mutfak']);
  // Narrowed to one source, only that source's categories are offered.
  assert.deepEqual(ids(listing.presentCategories(products as never,'ciftlik')),['tumu','cig-badem']);
  assert.deepEqual(ids(listing.presentCategories(products as never,'secki')),['tumu','paketli-urunler']);
  assert.deepEqual(ids(listing.presentCategories(products as never,'tumu')),['tumu','cig-badem','paketli-urunler']);
  // A catalogue missing a source never offers it.
  const farmOnly = [products[0]];
  assert.deepEqual(ids(listing.presentSources(farmOnly as never)),['tumu','ciftlik']);
});

test('listingHref keeps the existing parameters and omits defaults', () => {
  assert.ok(listing);
  assert.equal(listing.listingHref('/magaza','tumu','tumu','onerilen'),'/magaza');
  assert.equal(listing.listingHref('/magaza','cig-badem','ciftlik','fiyat-artan'),'/magaza?kategori=cig-badem&kaynak=ciftlik&sirala=fiyat-artan');
  assert.equal(listing.listingHref('/magaza/tarhana','tumu','tumu','fiyat-azalan'),'/magaza/tarhana?sirala=fiyat-azalan');
});

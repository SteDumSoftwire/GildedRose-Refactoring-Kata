import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('fixme');
  });
  it('should degrade quality by one', () => {
    const glidedRose = new GildedRose([new Item('item', 1, 5)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });
  it('should degrade quality twice as fast', () => {
    const glidedRose = new GildedRose([new Item('item', 0, 5)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });
  it('should not degrade anymore the quality', () => {
    const glidedRose = new GildedRose([new Item('item', 0, 0)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  it('aged brie should increse in quality', () => {
    const glidedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });
  it('quality should not be above 50', () => {
    const glidedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });
  it('sulfuras should not decrese in quality or ever be sold', () => {
    const glidedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 20)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(20);
    expect(items[0].sellIn).to.equal(1);
  });
  it('backstage pass should increase in quality by 2 if sellIn <= 10', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });
  it('backstage pass should increase in quality by 3 if sellIn <= 5', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(23);
  });
  it('backstage pass should drop in quality to 0 if sellin <= 0', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  it('conjured should degrade twice as fast', () => {
    const glidedRose = new GildedRose([new Item('Conjured', 1, 20)]);
    let items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(18);
    items = glidedRose.updateQuality();
    expect(items[0].quality).to.equal(14);
  });
});

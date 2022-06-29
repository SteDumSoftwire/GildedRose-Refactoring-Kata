import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';
import {before} from "mocha";

enum Items {
  Brie = 'Aged Brie',
  Pass = 'Backstage passes to a TAFKAL80ETC concert',
  Conjured = 'Conjured',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  Basic = 'item'
}

describe('Gilded Rose', () => {
  let testedItem: string = '';
  describe('Non-special item', () => {
    before(() => {
      testedItem = Items.Basic;
    });

    it('should degrade quality by one if sellin > 0', () => {
      //Given
      const glidedRose = new GildedRose([new Item(testedItem, 1, 5)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(4);
    });

    it('should degrade quality twice as fast if sellin <= 0', () => {
      //Given
      const glidedRose = new GildedRose([new Item(testedItem, 0, 5)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(3);
    });

    it('should not degrade anymore the quality if zero', () => {
      //Given
      const glidedRose = new GildedRose([new Item(testedItem, 0, 0)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Brie', () => {
    before(() => {
      testedItem = Items.Brie;
    });

    it('aged brie should increse in quality by 1 if sellin > 0', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Brie, 1, 10)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(11);
    });

    it('aged brie should increse in quality by 2 if sellin <= 0', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Brie, 0, 10)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(12);
    });

    it('quality should not be above 50', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Brie, 0, 50)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.above(49);
    });
  });

  describe("Sufluras", () => {
    before(() => {
      testedItem = Items.Sulfuras;
    });

    it('sulfuras should not decrease in quality', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Sulfuras, 1, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(20);
    });

    it('sulfuras should not be sold (sellIn doesn\'t decrement)', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Sulfuras, 1, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].sellIn).to.equal(1);
    });
  });

  describe('Pass', () => {
    before(() => {
      testedItem = Items.Pass;
    });

    it('backstage pass should increase in quality by 1 if sellIn > 10', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Pass, 11, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(21);
    });

    it('backstage pass should increase in quality by 2 if sellIn <= 10', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Pass, 10, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(22);
    });

    it('backstage pass should increase in quality by 3 if sellIn <= 5', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Pass, 5, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(23);
    });

    it('backstage pass should drop in quality to 0 if sellin <= 0', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Pass, 0, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Conjured', () => {
    before(() => {
      testedItem = Items.Conjured;
    });

    it('conjured should degrade twice as fast (sellIn > 0 case)', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Conjured, 1, 20)]);
      //When
      const items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(18);
    });

    it('conjured should degrade twice as fast (sellIn <= 0 case)', () => {
      //Given
      const glidedRose = new GildedRose([new Item(Items.Conjured, 0, 20)]);
      //When
      let items = glidedRose.updateQuality();
      //Then
      expect(items[0].quality).to.equal(16);
    })
  })
});

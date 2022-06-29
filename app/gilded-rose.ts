export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case 'Aged Brie': {
          if (item.sellIn > 0) {
            item.quality = Math.min(50, item.quality + 1);
          } else {
            item.quality = Math.min(50, item.quality + 2);
          }
          item.sellIn--;
          break;
        }
        case 'Backstage passes to a TAFKAL80ETC concert': {
          if (item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item.quality = Math.min(50, item.quality + 3);
          } else if (item.sellIn <= 10) {
            item.quality = Math.min(50, item.quality + 2);
          } else {
            item.quality = Math.min(50, item.quality + 1);
          }
          item.sellIn--;
          break;
        }
        case 'Conjured': {
          if (item.sellIn <= 0) {
            item.quality = Math.max(0, item.quality - 4);
          } else {
            item.quality = Math.max(0, item.quality - 2);
          }
          item.sellIn--;
          break;
        }
        case 'Sulfuras, Hand of Ragnaros': {
          break;
        }
        default: {
          if (item.sellIn <= 0) {
            item.quality = Math.max(0, item.quality - 2);
          } else {
            item.quality = Math.max(0, item.quality - 1);
          }
          item.sellIn--;
          break;
        }
      }
    }
    return this.items;
  }
}

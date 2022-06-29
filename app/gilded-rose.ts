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

enum Items {
  Brie = 'Aged Brie',
  Pass = 'Backstage passes to a TAFKAL80ETC concert',
  Conjured = 'Conjured',
  Sulfuras = 'Sulfuras, Hand of Ragnaros'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case Items.Brie: {
          this.increaseQualityBrie(item);
          break;
        }
        case Items.Pass: {
          this.increaseQualityPass(item);
          break;
        }
        case Items.Conjured: {
          this.decreaseQuality(item, true);
          break;
        }
        case Items.Sulfuras: {
          break;
        }
        default: {
          this.decreaseQuality(item, false);
          break;
        }
      }
    }
    return this.items;
  }

  decreaseQuality(item: Item, doubleDegradation: boolean) {
    let multiplicationFactor = 1;
    if (doubleDegradation)
      multiplicationFactor *= 2;
    if (item.sellIn <= 0) {
      item.quality = Math.max(0, item.quality - 2 * multiplicationFactor);
    } else {
      item.quality = Math.max(0, item.quality - multiplicationFactor);
    }
    item.sellIn--;
  }

  increaseQualityBrie(item: Item) {
    if (item.sellIn > 0) {
      item.quality = Math.min(50, item.quality + 1);
    } else {
      item.quality = Math.min(50, item.quality + 2);
    }
    item.sellIn--;
  }

  increaseQualityPass(item: Item) {
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
  }
}

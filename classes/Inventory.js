import Phaser from "phaser";

export default class Inventory extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.water = 0;
    this.dirt = 0;
    this.light = 0;

    //scene.add.existing(this);
  }
  displayInventory() {
    alert(
      "water: " +
        this.water +
        " " +
        "dirt: " +
        this.dirt +
        " " +
        "light: " +
        this.light
    );
  }

  addItem(item, amount) {
    if (item === "water") {
      this.water += amount;
    } else if (item === "light") {
      this.light += amount;
    } else if (item === "dirt") {
      this.dirt += amount;
    }
    this.displayInventory();
  }
  removeItem(item, amount) {
    if (item === "water") {
      this.water -= amount;
    } else if (item === "light") {
      this.light -= amount;
    } else if (item === "dirt") {
      this.item -= amount;
    }
  }
}

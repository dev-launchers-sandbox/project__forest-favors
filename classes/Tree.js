import Phaser from "phaser";

export default class Tree extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "tree", 0);
    this.scene = scene;

    this.name = "Tree Boi";
    this.age = 10 * Math.random(); // In tree years
    this.health = 100;
    this.healthBarBackground = scene.add.rectangle(30, 5, 50, 4, 0xff0000);

    // scene.add.rectangle(x, y, width, height, color)
    this.healthBar = scene.add.rectangle(30, 5, this.health / 2, 4, 0x66cd00);
    this.healthBar.width = 50;

    scene.add.existing(this);
    scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true)
      .setInteractive()
      .setOrigin() // fixes interactive offset issue
      .on("pointerdown", (pointer, localX, localY, event) => {
        // if the health is less than 100, add 5 health to the health bar
        this.addHealth(5);
        alert("health: " + this.health);

        // if a certain amount of time has passed, remove 5 health from the healthbar
      });

    setInterval(() => {
      this.removeHealth(5);
    }, 20000);
  }

  // addHealth() : adds health to this tree
  addHealth(amount) {
    if (this.health < 100) {
      this.health += amount;
    }
    this.updateHealthBarDisplay();
  }
  // removeHealth() : removes health from this tree
  removeHealth(amount) {
    if (this.health > 0) {
      this.health -= amount;
    }
    this.updateHealthBarDisplay();
  }

  updateHealthBarDisplay() {
    this.healthBar.width = this.health / 2;
  }

  preUpdate(time, delta) {}

  destroy() {
    // Call this object's parent class destroy method
    super.destroy();
  }
}

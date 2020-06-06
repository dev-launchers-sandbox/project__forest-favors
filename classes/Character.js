import Phaser from "phaser";
import Inventory from "./Inventory.js";

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "character");
    this.scene = scene;
    this.inventory = new Inventory(scene);
    this.DisplayInventory = this.scene.add.rectangle(100, 10, 50, 10, 0xff0000);
    this.InventoryShowing = false;
    this.DisplayInventory.setVisible(false);
    // this.DisplayInventory.setActive(false).isVisible(false);
    // Add to rendering engine
    scene.add.existing(this);
    // Create the physics-based sprite that we will move around and animate

    scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true);
    // Create the animations we need from the pet spritesheet
    const anims = scene.anims;
    anims.create({
      key: "character-idle",
      frames: anims.generateFrameNumbers("character", { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "character-walk",
      frames: anims.generateFrameNumbers("character", { start: 1, end: 1 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.play("character-idle", true);
    // Make sure the scene calls this object's update function every frame
    scene.events.on("update", this.update, this);
    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      W,
      A,
      S,
      D,
      E
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
      e: E
    });
    // Make sure the scene calls this object's update function every frame
    scene.events.on("update", this.update, this);
  }

  update() {
    const keys = this.keys;
    const sprite = this;
    const onGround = sprite.body.blocked.down || sprite.body.touching.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.a.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    if (keys.e.isDown) {
      if (this.InventoryShowing === false) {
        this.DisplayInventory.setVisible(true);
        this.InventoryShowing = true;
      } else {
        this.DisplayInventory.setVisible(false);
        this.InventoryShowing = false;
      }
    }

    //Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.w.isDown)) {
      sprite.setVelocityY(-250);
    }

    if (this.body.velocity.x > 0) {
      this.anims.play("character-walk", true);
      this.flipX = false;
    } else if (this.body.velocity.x < 0) {
      this.anims.play("character-walk", true);
      this.flipX = true;
    } else {
      this.anims.play("character-idle", true);
    }
  }

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.removeListener("update", this.update, this);
    super.destroy();
  }
}

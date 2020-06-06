import Phaser from "phaser";
export default class HealthOrb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "healthOrb");
    this.scene = scene;

    // Add this object to our rendering engine
    scene.add.existing(this);

    // Add this object to our physics engine
    scene.physics.add
      .existing(this)
      .setInteractive()
      .setCollideWorldBounds(true)
      .setOrigin() // fixes interactive offset issue
      .on("pointerup", function(pointer, localX, localY, event) {
        alert("you get extra health. yay");
        this.destroy();
      });
  }
}

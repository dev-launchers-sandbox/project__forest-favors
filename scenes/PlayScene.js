import Phaser from "phaser";

import Animal from "../classes/Animal.js";
import Ball from "../classes/Ball.js";
import Rabbit from "../classes/Rabbit.js";
import Frog from "../classes/Frog.js";
import Tree from "../classes/Tree.js";
import Character from "../classes/Character.js";
import Water from "../classes/Water.js";
import Light from "../classes/Light.js";
import HealthOrb from "../classes/HealthOrb.js";
import Inventory from "../classes/Inventory.js";
import Dirt from "../classes/Dirt.js";
export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const LEVEL_WIDTH = 400;
    const LEVEL_HEIGHT = this.game.config.height;
    this.physics.world.setBounds(0, 0, LEVEL_WIDTH, LEVEL_HEIGHT);
    // Start UIScene, which will layer on top of PlayScene
    this.scene.run("UIScene");

    let halfLevelWidth = LEVEL_WIDTH / 2;
    let halfLevelHeight = LEVEL_HEIGHT / 2;

    // Create sky
    this.sky = this.add.sprite(halfLevelWidth + 1, halfLevelHeight, "sky");

    // Create ground
    this.ground = this.physics.add.staticSprite(
      halfLevelWidth + 1,
      LEVEL_HEIGHT,
      "ground"
    );

    // Create pet
    this.tree = new Tree(this, 30, 30);
    this.pet = new Animal(this, 400 * Math.random(), 10);
    // Create the ball
    this.ball = new Ball(this, 400 * Math.random(), 10);
    this.rabbit = new Rabbit(this, 400 * Math.random(), 30);
    this.frog = new Frog(this, 400 * Math.random(), 30);
    this.character = new Character(this, 30, 30);
    this.orb = new HealthOrb(this, 400 * Math.random(), 50);
    for (var i = 0; i < 8; i++) {
      var random_x = 400 * Math.random();
      this.water = new Water(this, random_x, 30);
    }
    for (var i = 0; i < 10; i++) {
      var random_x = 400 * Math.random();
      this.light = new Light(this, random_x, 30);
    }
    for (var i = 0; i < 10; i++) {
      var random_x = 400 * Math.random();
      this.dirt = new Dirt(this, random_x, 30);
    }

    this.physics.add.collider(this.pet, this.ground);
    this.physics.add.collider(this.orb, this.ground);
    this.physics.add.collider(this.ball, this.ground);
    this.physics.add.collider(this.pet, this.ball);
    this.physics.add.collider(this.rabbit, this.ground);
    this.physics.add.collider(this.rabbit, this.ball);
    this.physics.add.collider(this.frog, this.ground);
    this.physics.add.collider(this.frog, this.ball);
    this.physics.add.collider(this.tree, this.ground);
    this.physics.add.collider(this.character, this.ground);
    this.physics.add.collider(this.character, this.pet);
    this.physics.add.collider(this.character, this.rabbit);
    this.physics.add.collider(this.character, this.frog);
    this.physics.add.collider(this.character, this.ball);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );
    camera.startFollow(this.character);
  }

  update(time, delta) {}
}

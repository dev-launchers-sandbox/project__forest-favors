import Phaser from "phaser";
import Item from "./Item";
export default class Light extends Item {
  constructor(scene, x, y) {
    super(scene, x, y, "light");
    this.scene = scene;
    this.setBounce(0, 0.1);
  }
}

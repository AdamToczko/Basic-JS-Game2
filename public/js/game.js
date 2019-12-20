import MainScene from "./MainScene.js";


const config = {
    width: 640,
    height: 640,
    type: Phaser.AUTO, // will auto-detect, Phaser.WEBGL, Phaser.CANVAS or Phaser.HEADLESS (no rendering at all).
    parent: 'phaser-game',//The DOM element into which this games canvas will be injected
    scene: [MainScene]
}

new Phaser.Game(config);
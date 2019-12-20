import Snake from "./Snake.js"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        this.snake = new Snake(this) // create instant of snake when scene starts
    }

    update(time) {
        this.snake.update(time); // update method on snake 
    }


}
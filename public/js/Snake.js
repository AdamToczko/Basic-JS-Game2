export default class Snake {
    constructor(scene) {
        this.scene = scene; // creating and assignin scene property 
        this.body =[]; //snake will grow
        this.body.push(this.scene.add.rectangle(0,0,16,16,0xff0000).setOrigin(0));
    }

    update(time) {
        this.body[0].x += 1;
        this.body[0].y += 1;
    }
} 
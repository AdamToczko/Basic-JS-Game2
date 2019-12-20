export default class Snake {
    constructor(scene) {
        this.scene = scene; // creating and assignin scene property 

        this.lastMoveTime = 0;
        this.moveInterval = 500;

        this.direction = Phaser.Math.Vector2.RIGHT; // start movement direction
        this.body =[]; //snake will grow
        this.body.push(this.scene.add.rectangle(100,100,16,16,0xff0000).setOrigin(0)); // head
        this.body.push(this.scene.add.rectangle(0,0,16,16,0x0000ff).setOrigin(0)); //body1
        this.body.push(this.scene.add.rectangle(0,0,16,16,0xffffff).setOrigin(0)); //body2

        scene.input.keyboard.on('keydown', e => {this.keydown(e)}) // key press detection
    }

    keydown(event) {
        switch(event.keyCode) {
            case 37: //left
            this.direction = Phaser.Math.Vector2.LEFT;
            break;
            case 38: //up
            this.direction = Phaser.Math.Vector2.UP;
            break;
            case 39: //right
            this.direction = Phaser.Math.Vector2.RIGHT;
            break;
            case 40: //down
            this.direction = Phaser.Math.Vector2.DOWN;
            break;
        }
    }

    update(time) {
        if(time >= this.lastMoveTime + this.moveInterval) {
            this.lastMoveTime = time;
            this.move();
        }
    }

    move() {
        // as ther will be more segments in for loop we will attach each new segment to one before 
        for(let index = this.body.length - 1; index > 0; index --){
            this.body[index].x = this.body[index-1].x; 
            this.body[index].y = this.body[index-1].y;
        }
        this.body[0].x += this.direction.x *10; 
        this.body[0].y += this.direction.y *10;
    }
    
} 
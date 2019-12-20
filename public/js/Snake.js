export default class Snake {
    constructor(scene) {
        this.scene = scene; // creating and assignin scene property 

        this.lastMoveTime = 0;
        this.moveInterval = 500;
        this.segment = 16

        this.direction = Phaser.Math.Vector2.RIGHT; // start movement direction
        this.body =[]; //snake will grow
        this.body.push(this.scene.add   // position snake on a grid multiple of segment 
        .rectangle(
            this.scene.game.config.width/2,
            this.scene.game.config.height/2,
            this.segment,
            this.segment,
            0xff0000
            )
            .setOrigin(0) // head
        );

        this.apple = this.scene.add.rectangle(0,0,this.segment,this.segment,0x00ff00)
        .setOrigin(0); // apple

        this.positionApple();

        scene.input.keyboard.on('keydown', e => {this.keydown(e)}) // key press detection
    }

    positionApple() {
        // as this.segment is 16 we need to position apple on a grid with number that is multiple of 16 
        this.apple.x = Math.floor((Math.random() * this.scene.game.config.width) / this.segment) * this.segment;
        this.apple.y = Math.floor((Math.random() * this.scene.game.config.height) / this.segment) * this.segment
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

        // we need to know where head is moving and stays on grid 
        let x = this.body[0].x + this.direction.x * this.segment
        let y = this.body[0].y + this.direction.y * this.segment

        // eating the apple and increasing body size 
        if(this.apple.x === x && this.apple.y === y) {
            this.body.push(this.scene.add.rectangle(0,0,this.segment, this.segment,0xffffff).setOrigin(0));
            this.positionApple();
        }


        // as ther will be more segments in for loop we will attach each new segment to one before 
        for(let index = this.body.length - 1; index > 0; index --){
            this.body[index].x = this.body[index-1].x; 
            this.body[index].y = this.body[index-1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;

        // make snake die for going out of bounds 
        if( this.body[0].x < 0 || 
            this.body[0].x >= this.scene.game.config.width || 
            this.body[0].y < 0 || 
            this.body[0].y >= this.scene.game.config.height) {
                this.scene.scene.restart();
        }
    }
    
} 
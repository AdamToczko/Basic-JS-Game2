export default class Snake {
    constructor(scene) {
        this.scene = scene; // creating and assignin scene property 

        this.lastMoveTime = 0;
        this.moveInterval = 300;
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
            if(this.direction !== Phaser.Math.Vector2.RIGHT) // added to stop turning back on itself
            this.direction = Phaser.Math.Vector2.LEFT;
            break;
            case 38: //up
            if(this.direction !== Phaser.Math.Vector2.DOWN)
            this.direction = Phaser.Math.Vector2.UP;
            break;
            case 39: //right
            if(this.direction !== Phaser.Math.Vector2.LEFT)
            this.direction = Phaser.Math.Vector2.RIGHT;
            break;
            case 40: //down
            if(this.direction !== Phaser.Math.Vector2.UP)
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

        // snake dies going out of bounds 
        if( this.body[0].x < 0 || 
            this.body[0].x >= this.scene.game.config.width || 
            this.body[0].y < 0 || 
            this.body[0].y >= this.scene.game.config.height) {
                this.scene.scene.restart();
        }
        // snake dies eating his own tail head === any of tail position
        let tail = this.body.slice(1);
        //if(tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y).length > 0) // we will get array back for every segment that makes this true and then length will be greater then 0
        //shorter way with array some method which returns true or false 
        if(tail.some(s => s.x === this.body[0].x && s.y === this.body[0].y))
        {
            this.scene.scene.restart();
        }

    }
    
} 
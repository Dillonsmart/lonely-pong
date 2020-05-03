export default class Ball {

    constructor(game) {

        this.game = game;
        
        this.position = {x: Math.floor(Math.random() * 700) + 1, y: Math.floor(Math.random() * 300) + 1};
        this.speed = {x: this.game.ballSpeed.x, y: this.game.ballSpeed.y};
        this.size = 25;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

    }

    draw(ctx) {

        // ctx.drawImage(
        //     this.image, 
        //     this.position.x, 
        //     this.position.y, 
        //     this.size, 
        //     this.size
        // );

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 15, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#fff';
        ctx.stroke();  

    }

    update(deltaTime) {

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // collision detection wall left and right
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        // collision detection with the top of the game
        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        // collision detection with the bottom of the game
        if(this.position.y + this.size > this.gameHeight){
            this.game.lives--;
        }


        // collision detection with paddel 
        let bottomOfBall = this.position.y + this.size;
        let topOfPaddle = this.game.paddle.position.y;
        let leftSideOfPaddle = this.game.paddle.position.x;
        let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        if(
            bottomOfBall >= topOfPaddle && 
            this.position.x >= leftSideOfPaddle && 
            this.position.x + this.size <= rightSideOfPaddle
        ) {
            this.game.updateScore();
            this.speed.y = -(this.game.ballSpeed.y);
            if(Math.sign(this.speed.x) === -1){
                this.speed.x = -this.game.ballSpeed.x;
            } else {
                this.speed.x = this.game.ballSpeed.y;
            }
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }

}
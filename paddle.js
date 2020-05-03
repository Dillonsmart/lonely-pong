export default class Paddle {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.game = game;
        this.width = 150;
        this.height = 20;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }

    }

    moveLeft() {
        this.speed = -this.game.paddleSpeed;
    }

    moveRight() {
        this.speed = this.game.paddleSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(ctx) {

        ctx.fillStyle = "#fff";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {

        this.position.x += this.speed;

        if(this.position.x  < 0) 
            this.position.x = 0;

        if(this.position.x  + this.width > this.gameWidth) 
            this.position.x = this.gameWidth - this.width;

    }

}
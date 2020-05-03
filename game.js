import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game{

    constructor(gWidth, gHeight){

        this.gameWidth = gWidth;
        this.gameHeight = gHeight;

        this.score = 0;

        this.gamestate = GAMESTATE.MENU;

        this.ballSpeed = {
            x: 4,
            y: 4
        };

        this.paddleSpeed = 7;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 1;
        new InputHandler(this, this.paddle);

    }   

    start() {

        if(this.gamestate === GAMESTATE.GAMEOVER) {
            this.score = 0;
            this.lives = 1;
            this.paddleSpeed = 7;
            this.ballSpeed = {
                x: 4,
                y: 4
            };    
            this.paddle = new Paddle(this);
            this.ball = new Ball(this);
            new InputHandler(this, this.paddle);
        }

        this.gameObjects = [
            this.ball,
            this.paddle
        ]

        this.gamestate = GAMESTATE.RUNNING;

    }

    update(deltaTime) {

        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if(
            this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU || 
            this.gamestate === GAMESTATE.GAMEOVER) {
            return;
        }

        this.gameObjects.forEach((object) => object.update(deltaTime));
    }  

    draw(ctx) {
        
        this.gameObjects.forEach((object) => object.draw(ctx));

        if(this.gamestate === GAMESTATE.PAUSED){
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.4)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gamestate === GAMESTATE.MENU){
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press spacebar to begin", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gamestate === GAMESTATE.GAMEOVER){
            
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("SCORE: " + this.score, this.gameWidth / 2, this.gameHeight / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Press spacebar to play again", this.gameWidth / 2, this.gameHeight - 50);

        }

    }

    updateScore(){

        this.score = this.score + 1;

        this.ballSpeed.x = this.score + 4;
        this.ballSpeed.y = this.score + 4;
        this.paddleSpeed = this.paddleSpeed + 1;

    }

    togglePause() {

        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            console.log(this.gamestate);
            this.gamestate = GAMESTATE.PAUSED;
        }

    }

}
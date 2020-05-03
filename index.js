import Game from "./game.js";


let c = document.getElementById("gameScreen");
let ctx = c.getContext("2d");

const GAME_WIDTH = c.width; // 800
const GAME_HEIGHT = c.height; // 600

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

// the game loop runs every frame
function gameLoop(timestamp) {

    // calculate how much time has passed 
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect( 0, 0, GAME_WIDTH, GAME_HEIGHT ); // clear the screen for the next frame

    game.update(deltaTime);
    game.draw(ctx);

    // call self for next frame with next frames time stamp
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

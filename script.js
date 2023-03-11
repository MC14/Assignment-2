///Started with the initalizing of the canvas by getting it from the DOC and contexting it in 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


/// created object ball to be refrenced by code
const ball = {
    radius: 20,
    positionX: canvas.width / 2 + 20,
    positionY: canvas.height / 2 + 20,
    velocityX: 4,
    velocityY: 4,
    color: 'black'
}
/// created a refrence object for the two paddles in the game
const leftPaddle = {
    height: 100,
    width: 25,
    positionX: canvas.width/8,
    positionY: canvas.height/4,
    color: 'red',
    player: 'left',
    speed: 4
}

const rightPaddle= {
    height: 100,
    width: 25,
    positionX: canvas.width-112.5,
    positionY: canvas.height/4,
    color: 'blue',
    player: 'right',
    speed: 4
}
 ///this function draws the paddles based on the parameters given
function drawPaddle(x,y,sizex,sizey,color){
    ctx.fillStyle = color; ///fill style fills in the rectangle with the color given
    ctx.fillRect(x,y,sizex,sizey); ///creates the rectangle starting with the position of pixels and the size of rectangle
}
///this function draws a circle based ball object
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

drawPaddle(leftPaddle.positionX,leftPaddle.positionY,leftPaddle.width,leftPaddle.height,leftPaddle.color)
drawPaddle(rightPaddle.positionX,rightPaddle.positionY,rightPaddle.width,rightPaddle.height,rightPaddle.color)
drawBall()

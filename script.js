///Started with the initalizing of the canvas by getting it from the DOC and contexting it in 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


/// created object ball to be refrenced by code
const ball = {
    radius: 15,
    positionX: canvas.width / 2,
    positionY: canvas.height / 2,
    dx: 4,
    dy: 4,
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
    dy: 0,
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

const game = {
    leftScore: 0,
    rightScore: 0,
    turn: 0,
    topScore: 20,
    speedIncreaseHit: 0,
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

function moveBall(){
    ball.positionX += ball.dx;
    ball.positionY += ball.dy;

    if(ball.positionX + ball.radius > canvas.width || ball.positionX - ball.radius < 0){
        ball.dx *= -1;
    }

    if(ball.positionY + ball.radius > canvas.height || ball.positionY - ball.radius < 0){
        ball.dy *= -1;
    }

    if(ball.positionX + ball.radius + ball.dx < leftPaddle.positionX){
        if(ball.positionY + ball.radius +ball.dy <= leftPaddle.height){
            ball.dx *=1;
        }
    }
}

function moveUp(){
    leftPaddle.dy = -leftPaddle.speed;
    detectbarrier()
}

function moveDown(){
    leftPaddle.dy = leftPaddle.speed;
    detectbarrier()
}

function movePaddle(){
    leftPaddle.positionY += leftPaddle.dy;
    
}

function detectbarrier(){
    if (leftPaddle.positionY < 0){
        leftPaddle.positionY = 0;
    }

    if (leftPaddle.positionY + leftPaddle.height > canvas.height){
        leftPaddle.positionY = canvas.height - leftPaddle.height;
    }
}

function keyDown(e){
    if(e.key === 'ArrowUp' || e.key === 'Up'){
        moveUp();
    }
    else if(e.key === 'ArrowDown'|| e.key === 'Down'){
        moveDown();
    }
}

function keyUp(e){
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Up' || e.key === 'Down')
    {
        leftPaddle.dy = 0
    } 
}



function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle(leftPaddle.positionX,leftPaddle.positionY,leftPaddle.width,leftPaddle.height,leftPaddle.color)
    drawPaddle(rightPaddle.positionX,rightPaddle.positionY,rightPaddle.width,rightPaddle.height,rightPaddle.color)
    moveBall();
    movePaddle();

    requestAnimationFrame(update)
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);





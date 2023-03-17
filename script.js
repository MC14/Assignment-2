///Started with the initalizing of the canvas by getting it from the DOC and contexting it in 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const plyScore = document.getElementById('player score')
const compScore = document.getElementById('computer score')
const display = document.getElementById('display')

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
    height: 75,
    width: 25,
    positionX: canvas.width/8,
    positionY: canvas.height/4,
    color: 'red',
    player: 'left',
    dy: 0,
    speed: 6
}

const rightPaddle= {
    height: 75,
    width: 25,
    positionX: canvas.width-112.5,
    positionY: canvas.height/4,
    color: 'blue',
    player: 'right',
    dy: 0,
    speed: 6
}

const game = {
    topScore: 20,
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
    ball.positionX -= ball.dx;
    ball.positionY -= ball.dy;

    if(ball.positionX + ball.radius > canvas.width){
        resetball();
        updatescore(true);
    }

    if(ball.positionX - ball.radius < 0){
        resetball();
        updatescore(false);
    }

    if(ball.positionY + ball.radius > canvas.height || ball.positionY - ball.radius < 0){
        ball.dy *= -1;
    }

    if(leftPaddle.positionX < ball.positionX + ball.radius && leftPaddle.positionX+leftPaddle.width > ball.positionX
        && leftPaddle.positionY<ball.positionY+ball.radius && leftPaddle.positionY +leftPaddle.height > ball.positionY){
            ball.dx *= -1;
        }

    if(rightPaddle.positionX < ball.positionX + ball.radius && rightPaddle.positionX+rightPaddle.width > ball.positionX
        && rightPaddle.positionY<ball.positionY+ball.radius && rightPaddle.positionY +rightPaddle.height > ball.positionY){
            ball.dx *= -1;
        }
}

function resetball(){
    ball.positionX = canvas.width / 2;
    ball.positionY = canvas.height / 2;
    ball.dx = 4;
}

function updatescore(score){
    if (score == true){
        plyScore.textContent = parseInt(plyScore.textContent) + 1;
        gameover(parseInt(plyScore.textContent), score)
        document.getElementById('display').innerHTML = "Player scored a point!";
    }
    else if(score == false){
        compScore.textContent = parseInt(compScore.textContent) + 1;
        gameover(parseInt(compScore.textContent), score)
        document.getElementById('display').innerHTML = "Computer scored a point!";
    }
}

function gameover(total, score){
    if (total == 20){
        if(score == true){
            resetball();
            ball.dy = 0;
            ball.dx = 0;
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
            plyScore.textContent = parseInt(0);
            compScore.textContent = parseInt(0);
            document.getElementById('finalscore').innerHTML = "The Player wins!"

        }
        if(score == false){
            resetball();
            ball.dy = 0;
            ball.dx = 0;
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
            plyScore.textContent = parseInt(0);
            compScore.textContent = parseInt(0);
            document.getElementById('finalscore').innerHTML = "The Computer Wins!";

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

function movePaddleAI(){

    if (rightPaddle.positionY > ball.positionY - (rightPaddle.height/2)){
        if(ball.dx < 0){
            rightPaddle.dy = rightPaddle.speed/2
            rightPaddle.positionY -= rightPaddle.dy;    
        }
        else if(ball.dx > 0){
            rightPaddle.dy = rightPaddle.speed
            rightPaddle.positionY -= rightPaddle.dy;
        }
        detectbarrier()
}
    
    if (rightPaddle.positionY < ball.positionY - (rightPaddle.height/2)){
        if(ball.dx < 0){
            rightPaddle.dy = rightPaddle.speed/2
            rightPaddle.positionY += rightPaddle.dy;    
        }
        else if(ball.dx > 0){
            rightPaddle.dy = rightPaddle.speed
            rightPaddle.positionY += rightPaddle.dy;
        }
        detectbarrier()
}
}
       

function detectbarrier(){
    if (leftPaddle.positionY <= 0){
        leftPaddle.positionY = 0;
    }

    if (leftPaddle.positionY + leftPaddle.height > canvas.height){
        leftPaddle.positionY = canvas.height - leftPaddle.height;
    }

    if (rightPaddle.positionY <= 0){
        rightPaddle.positionY = 0;
    }

    if (rightPaddle.positionY + rightPaddle.height > canvas.height){
        rightPaddle.positionY = canvas.height - rightPaddle.height;
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
    movePaddleAI();

    requestAnimationFrame(update)
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);





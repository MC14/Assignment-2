
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ball = {
    radius: 20,
    positionX: canvas.width / 2 + 20,
    positionY: canvas.height / 2 + 20,
    velocityX: 4,
    velocityY: 4,
    color: 'black'
}

const leftPaddle = {
    height: 100,
    width: 10,
    positionX: 10,
    positionY: canvas.height / 2 - 100 / 2,
    color: 'white',
    player: 'left',
    speed: 4
}

const rightPaddle= {
    height: 100,
    width: 10,
    positionX: canvas.width - 20,
    positionY: canvas.height / 2 - 100 / 2,
    color: 'white',
    player: 'right',
    speed: 4
}

function drawPaddle(x,y,sizex,sizey,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,sizex,sizey);
}

function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.arc(canvas.width/2, canvas.height/2, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

drawPaddle(canvas.width/8,canvas.height/4,25,100,'red')
drawPaddle(canvas.width-112.5,canvas.height/4,25,100,'blue')
drawBall()

///Started with the initalizing of the canvas and consts from the html by getting it from the DOC and contexting it in 2D
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
/// created a refrence object for the player paddle in the game
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
///created another refrence object for the computer paddle in the game
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
///this function allows the ball to move
function moveBall(){
    ball.positionX -= ball.dx; ///changes the ball position by using negative ball speed position
    ball.positionY -= ball.dy;

    ///if the position + the radius is greater than the canvas's maxinmum
    if(ball.positionX + ball.radius > canvas.width){
        resetball(); ///calls the function to reset the ball in the middle
        updatescore(true); ///calls the function with the parameter true meaning the player score
    }
    ///if the position minus the radius is less than zero
    if(ball.positionX - ball.radius < 0){
        resetball(); ///calls the function to reset the ball
        updatescore(false); ///calls the function with the parameter false meaning the computer score
    }
    ///allows the ball to bounce off the top and the bottom of the canvas
    if(ball.positionY + ball.radius > canvas.height || ball.positionY - ball.radius < 0){
        ball.dy *= -1;
    }
    ///if the left paddle's x is the same as the ball's x position, make it bounce
    if(leftPaddle.positionX < ball.positionX + ball.radius && leftPaddle.positionX+leftPaddle.width > ball.positionX
        && leftPaddle.positionY<ball.positionY+ball.radius && leftPaddle.positionY +leftPaddle.height > ball.positionY){
            ball.dx *= -1;
        }
    ///if the right paddle matches the same x position as the paddle, bounce 
    if(rightPaddle.positionX < ball.positionX + ball.radius && rightPaddle.positionX+rightPaddle.width > ball.positionX
        && rightPaddle.positionY<ball.positionY+ball.radius && rightPaddle.positionY +rightPaddle.height > ball.positionY){
            ball.dx *= -1;
        }
}
//this function resets the ball
function resetball(){
    ball.positionX = canvas.width / 2; //gives the ball position from half the canvas
    ball.positionY = canvas.height / 2; //gives the ball position y from half the canvas
    ball.dx = 4; //keeps it moving using dx
}
//function runs and updates the score
function updatescore(score){
    if (score == true){//if score is true, the player scored
        plyScore.textContent = parseInt(plyScore.textContent) + 1; //parse int turns the text into an interger and adds one to it, text content
        gameover(parseInt(plyScore.textContent), score)
        document.getElementById('display').innerHTML = "Player scored a point!"; //adds a display message at the bottom telling you have scored
    }
    else if(score == false){//if false, the computer scored
        compScore.textContent = parseInt(compScore.textContent) + 1;
        gameover(parseInt(compScore.textContent), score)
        document.getElementById('display').innerHTML = "Computer scored a point!";//adds display message, telling computer scored a point
    }
}
//runs function gameover with totalscore and score parameter
function gameover(total, score){
    if (total == 20){//if a score equals 20
        if(score == true){//if score is true, the player
            resetball();
            ball.dy = 0; //stops the ball from moving
            ball.dx = 0;
            document.removeEventListener('keydown', keyDown);//removes the event listener 
            document.removeEventListener('keyup', keyUp);
            plyScore.textContent = parseInt(0);//resets the text content 
            compScore.textContent = parseInt(0);
            document.getElementById('finalscore').innerHTML = "The Player wins!"//final display messages

        }
        if(score == false){//if the computer won, most of the same
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
//function move up, moves the paddle upward
function moveUp(){
    leftPaddle.dy = -leftPaddle.speed;
    detectbarrier()//runs the function detect barrier to make sure it doesn't go off the map
}
//function move down, moves the paddle downward
function moveDown(){
    leftPaddle.dy = leftPaddle.speed;
    detectbarrier()
}
//gives the paddle the ability to move
function movePaddle(){
    leftPaddle.positionY += leftPaddle.dy;
    
}
//this function moves the paddle AI
function movePaddleAI(){
    //if the right paddle's y position is greater than the ball's y position subtracting half of the right paddle's height, move the paddle down
    if (rightPaddle.positionY > ball.positionY - (rightPaddle.height/2)){
        if(ball.dx < 0){ //if the ball is coming towards the paddle
            rightPaddle.dy = rightPaddle.speed/2 //the paddle moves at half the speed 
            rightPaddle.positionY -= rightPaddle.dy;    
        }
        else if(ball.dx > 0){//if its moving away from the paddle 
            rightPaddle.dy = rightPaddle.speed //move at normal speed
            rightPaddle.positionY -= rightPaddle.dy;
        }
        detectbarrier() //runs the detect barrier function for the A.I to make sure it stays on screen
}
    //if the paddle y is less than move the paddle up
    if (rightPaddle.positionY < ball.positionY - (rightPaddle.height/2)){
        if(ball.dx < 0){//the same if conditions as above 
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
       
//this functions checks the canvas barriers to make sure that the paddle are unable to move past it 
function detectbarrier(){
    if (leftPaddle.positionY <= 0){
        leftPaddle.positionY = 0;
    }
    //similiar checks to the ball barrier, making sure
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

//this function checks for keys being pressed down
function keyDown(e){
    if(e.key === 'ArrowUp' || e.key === 'Up'){ //if the e parameter is arrow up, use the move up function
        moveUp();
    }
    else if(e.key === 'ArrowDown'|| e.key === 'Down'){//if the e parameter is arrow down, use the move down function
        moveDown();
    }
}

//this function runs when keys are put up
function keyUp(e){
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Up' || e.key === 'Down')
    {
        leftPaddle.dy = 0 //stops the paddle from moving
    } 
}


// runs function update that does all the animation and moving of the paddles and game
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height); //clears the entire canvas
    drawBall(); //runs the draw ball function
    drawPaddle(leftPaddle.positionX,leftPaddle.positionY,leftPaddle.width,leftPaddle.height,leftPaddle.color) //draws the two paddle with all the parameters to create it
    drawPaddle(rightPaddle.positionX,rightPaddle.positionY,rightPaddle.width,rightPaddle.height,rightPaddle.color) //including the height,width,color,its position etc
    moveBall();//runs the move ball
    movePaddle();//moves the paddle
    movePaddleAI();//moves the paddle AI

    requestAnimationFrame(update)//this reruns the update function to continue the update function, this allows the canvas to simulate animation
}
///runs the update in the script
update();

document.addEventListener('keydown', keyDown);//adds an event listener keydown that runs the keydown function, for when a key is pressed
document.addEventListener('keyup', keyUp);//adds an event listener key up for when a key is not up, runs the function key up





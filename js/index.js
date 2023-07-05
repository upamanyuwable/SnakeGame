// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}  //location of snake head initially
];

food = {x: 6, y: 7};//initial food location 

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    
    if((ctime - lastPaintTime)/1000 < 1/speed){ // divided by 1000 as time is in milisecond
        return;
    }
    lastPaintTime = ctime;
    gameEngine();//this function will run the game
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){    //snake array will be holding the locations of body parts of snake (array of object)
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        //The unshift() method adds new elements to the beginning of an array.
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});   
        let a = 2;
        let b = 16;
        //if we have to generate random number between a & b , a+(b-a)*Math.random()
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        // snakeArr[i+1] = snakeArr[i];         it is not possible 
        snakeArr[i+1] = {...snakeArr[i]};   //ye line ek naya object bna rhi h jisme srf snakeArr[i] h
        //we did this taaki refererence problem na rahe
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and Food

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;  //it will place the snake at this row in the grid (why y? bcoz hume row nikalni h)
        snakeElement.style.gridColumnStart = e.x;   //it will place the snake at this column in the grid

        if(index === 0){//index=0 mtlb hum snake k head p h to usse alg css deni thi hume isliye dusri class use ki
            snakeElement.classList.add('head');//snake element ko class di for using css
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    // console.log(e);
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
            
        default:
            // alert("Play with arrow keys");
            break;
    }

});
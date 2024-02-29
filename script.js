const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [6,4,2],
    [0,4,8]
];

//lets create the function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    //UI pr empty krna hoga
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //one more thing is missing ,initialize property with css boxes again

        
            box.classList=`box box${index+1}`;
    
    })

    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

//function check Game over
function checkGameOver(){
let answer="";
winningPosition.forEach((position)=>{
    //all 3 boxes are non-empty and exactly same in value
    if((gameGrid[position[0]]!=="")&&(gameGrid[position[1]]!=="")&&(gameGrid[position[2]]!=="")
    &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){

        //check if winner is x
        if(gameGrid[position[0]]==='X')
        {
            //gameInfo.innerText=`Winner is - X`;
            answer="X";
        }
        else{
            //gameInfo.innerText=`Winner is - O`;
            answer="O";
        }
        //pointer events none
        boxes.forEach((box)=>{
            box.style.pointerEvents='none';
        })
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");


    }
})
//if answer is not empty so
if(answer!==""){
    gameInfo.innerText=`Winner is - ${answer}`;
    newGameBtn.classList.add("active");
    
}
//lets check game is tie
let fillCount=0;
gameGrid.forEach((cell)=>
{
    if(cell===""){
        fillCount++;
    }
})
//if fill count is 0 means tie hai
if(fillCount===0){
    newGameBtn.classList.add("active");
    gameInfo.innerText=`Game Tie`;
}

}

//swap turn function
function swapTurn(){
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

//handle click function
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none';

        //swap karo turn ko
        swapTurn();
        //check koi jeet to nhi gaya
        checkGameOver();
        
    }
}
//boxes operation
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
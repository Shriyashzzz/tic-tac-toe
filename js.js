


const gameBoard = (function(){
    const boardArray = Array.from({length: 3}, () => Array(3).fill(undefined))

    const setValue = (id, row, col, playerOwnInputArray) =>{
        if(id ==1 ){
            boardArray[row][col] = "X"
            playerOwnInputArray[row][col] = id;
        }

        else if(id ==2){
            boardArray[row][col] = "O"
            playerOwnInputArray[row][col] = id;
            }
        console.table(boardArray);
        }
        


   
    const getValueAt = (row, col) =>{
            return (boardArray[row][col])
        }
     const checkIfOccupied = (row, col)=>{
        if(getValueAt(row, col) === undefined){
            return false; // false for unoccupiedhit index
        }else{ 
            return true; // true for occupied hit index
        }

    }


    const invokeIfWon = (id,winningIndexString ) =>{
        console.log(`player${id} won by choosing values at `,winningIndexString )
        userUI.disableButton();
    }
    const checkIfWon = (id, givenBoard)  =>{
        console.log("checkIfWon starting");
        let diagonalSameSum = 0;
        for(let i = 0; i <= 2; i++){

            //checks rows
            let winningIndex = "";
            let rowSum = 0; // starts at 0 to check for three counts
            let colSum = 0;
                for(let j = 0; j <= 2; j++){
                rowSum += givenBoard[i][j];
                colSum += givenBoard[j][i];
                if(i==j){
                    diagonalSameSum += givenBoard[j][i];
                }

                if((rowSum == 3) || (rowSum==6)){
                    winningIndex = `[${i}][0],[${i}][1],[${i}][2] `
                    invokeIfWon(id,winningIndex )
                    break;
                }
                else if((colSum == 3) || (colSum==6)){
                    winningIndex = `[${i}][0],[${i}][1],[${i}][2] `
                    invokeIfWon(id,winningIndex );
                    break;
                }

                
            }   
            //check diagnals same values
            if((diagonalSameSum == 3) || (diagonalSameSum==6)){
                winningIndex = `[0][0],[1][1],[2][2] `
                invokeIfWon(id,winningIndex );
                return;
            }
            //check diagnals opposite 
                
            let diagonalOppositeSum = givenBoard[0][2] + givenBoard[1][1] + givenBoard[2][0];
            if((diagonalOppositeSum == 3) || (diagonalOppositeSum==6)){
                winningIndex = `[0][2],[1][1],[2][0] `
                invokeIfWon(id,winningIndex );
                return;
            }
        }
    }

    function createPlayer(id){
        const playerid = id;
        const playerOwnInputArray = Array.from({length: 3}, () => Array(3).fill(undefined));

        const inputValue = (arrayIndexRow, arrayIndexCol) => {
            setValue(playerid,arrayIndexRow, arrayIndexCol, playerOwnInputArray)
            checkIfWon(playerid, playerOwnInputArray)      
            
        }
        
        
    
        return {playerid, inputValue, getValueAt} 
    }

    const player1 = createPlayer(1);
    const player2 = createPlayer(2);


    return{player1, player2, checkIfOccupied};  // Documenting my mistakes with comments. Hence make sure it's in {} tags to ensure you are returning objects!
 
})(); // need () for IIFE




const userUI =( function(){
    const clickBtn = document.querySelectorAll(".cell");
    
    function startGame(){

        let even0ddCounter = 1;
        const gameInfo= document.querySelector(".gameInfo");
        gameInfo.textContent = "Player 1 Turn"
        clickBtn.forEach((button) => button.addEventListener('click', ()=>{
            let hitIndex = button.dataset.id.split(',');
            if(gameBoard.checkIfOccupied(hitIndex[0], hitIndex[1])){
                return
            }
            else if(even0ddCounter ==9){
                disableButton();
                setPlayerinfo("Draw")
            }
            else{
                if(even0ddCounter%2 !=0){
                    gameBoard.player1.inputValue(hitIndex[0], hitIndex[1])
                    even0ddCounter +=1
                    button.textContent = "X";
                    setPlayerinfo("Player 2 Turn")
                    // player1.inputValue()
                }else{
                    gameBoard.player2.inputValue(hitIndex[0], hitIndex[1])
                    button.textContent = "O";
                    even0ddCounter+=1
                    setPlayerinfo("Player 1 Turn")
            }
            }
            
        }))

        const setPlayerinfo = (info) =>{
            gameInfo.textContent = info;

        }

        
    }
    const disableButton = () =>{
            clickBtn.forEach((button) =>{
                button.disabled =true;
            })
            console.log("game over")
    }
    const enableButtons =() =>{
        clickBtn.forEach((button) =>{
                button.disabled =false;
        })
        
    }
    return{startGame, disableButton, enableButtons}
  

})();




const startBtn = document.querySelector(".Start")
const resetBtn = document.querySelector(".Reset")
userUI.disableButton()
startBtn.addEventListener('click', ()=>{
    userUI.enableButtons()
    userUI.startGame();
   
})

resetBtn



const gameBoard = (function(){
    const boardArray = Array.from({length: 3}, () => Array(3).fill(undefined))

    const setValue = (id, row, col, playerOwnInputArray) =>{
        if(checkIfOccupied(row, col)!= true){ // false means hit box was empty hence can aprrove hit 
            if(id ==1 ){
                boardArray[row][col] = "X"
                playerOwnInputArray[row][col] = id;
                return true; //true means hit box was unnoocupied and therefore allowed to hit
            }

            else if(id ==2){
                boardArray[row][col] = "O"
                playerOwnInputArray[row][col] = id;
                return true;  //true means hit box was unnoocupied and therefore allowed to hit
             }
            
        }
       

       console.table(boardArray);
    }

   
    const getValueAt = (row, col) =>{
            return (boardArray[row][col])
        }
     const checkIfOccupied = (row, col)=>{
        if(getValueAt(row, col) === undefined){
            return false;
        }else{
            return true;
        }

    }


    const invokeIfWon = (id,winningIndexString ) =>{
        console.log(`player${id} won by choosing values at `,winningIndexString )
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
            setValue(playerid,arrayIndexRow, arrayIndexCol, playerOwnInputArray);
            checkIfWon(playerid, playerOwnInputArray)
        }
        
        
    
        return {playerid, inputValue, getValueAt} 
    }

    const player1 = createPlayer(1);
    const player2 = createPlayer(2);


    return{player1, player2};  // Documenting my mistakes with comments. Hence make sure it's in {} tags to ensure you are returning objects!
 
})(); // need () for IIFE




const start = ( function(){
    
    let even0ddCounter = 1;
    const clickBtn = document.querySelectorAll(".cell");
    clickBtn.forEach((button) => button.addEventListener('click', ()=>{
        let hitIndex = button.textContent.split(',');
        if(even0ddCounter%2 !=0){
            gameBoard.player1.inputValue(hitIndex[0], hitIndex[1])

            even0ddCounter +=1
            // player1.inputValue()
        }else{
            gameBoard.player2.inputValue(hitIndex[0], hitIndex[1])
            even0ddCounter+=1

        }
    
    
    }))

    const checkHitOverlap = (player, row, col) =>
        if 
    }
    

})();
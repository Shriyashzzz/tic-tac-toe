


const gameBoard = (function(){
    const boardArray = Array.from({length: 3}, () => Array(3).fill(undefined))

    const setValue = (id, row, col, playerOwnInputArray) =>{
        if(id ==1){
            boardArray[row][col] = "X"
            playerOwnInputArray[row][col] = id;

        }else if(id ==2){
            boardArray[row][col] = "O"
            playerOwnInputArray[row][col] = id;
        }

       console.table(playerOwnInputArray);
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
        const playerid = id
        const playerOwnInputArray = Array.from({length: 3}, () => Array(3).fill(undefined));

        const inputValue = (arrayIndexRow, arrayIndexCol) => {
            setValue(playerid,arrayIndexRow, arrayIndexCol, playerOwnInputArray);
            checkIfWon(playerid, playerOwnInputArray)
        }
        
        const getValueAt = (arrayIndexRow, arrayIndexCol) =>{
            return (boardArray[arrayIndexRow][arrayIndexCol])
        }
    
        return {playerid, inputValue, getValueAt} 
    }

    const player1 = createPlayer(1);
    const player2 = createPlayer(2);


    return{player1, player2};  // Documenting my mistakes with comments. Hence make sure it's in {} tags to ensure you are returning objects!
 
})(); // need () for IIFE


gameBoard.player2.inputValue(0,0);

gameBoard.player2.inputValue(1,1);

gameBoard.player2.inputValue(2,2);

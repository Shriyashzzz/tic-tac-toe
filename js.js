const gameBoard = (function(){
    let boardArray = Array.from({length: 3}, () => Array(3).fill(undefined))
    let even0ddCounter = 1;
    let player1, player2;

    const setValue = (id, row, col, playerOwnInputArray) =>{
        if(id == 1){
            boardArray[row][col] = "X"
            playerOwnInputArray[row][col] = id;
        } else if(id == 2){
            boardArray[row][col] = "O"
            playerOwnInputArray[row][col] = id;
        }
        console.table(boardArray);
    }

    const resetBoardArray = () =>{
        boardArray = Array(3).fill().map(() => Array(3).fill(undefined));
        even0ddCounter = 1;
        resetPlayers(); // recreate players so their arrays are fresh
        console.table(boardArray);
    }

    const getEvenOddCounter = () => even0ddCounter;
    const incerementEvenOddCounter = () => even0ddCounter += 1;

    const getValueAt = (row, col) => boardArray[row][col];

    const checkIfOccupied = (row, col) =>{
        return getValueAt(row, col) !== undefined;
    }

    const invokeIfWon = (id, winningIndexString) =>{
        console.log(`player${id} won at`, winningIndexString)
        userUI.setPlayerinfo(`Player ${userUI.getUserPlayerName(id)} wins!`);
        userUI.disableButton();
        
    }

    const checkIfWon = (id, givenBoard) =>{
        let diagonalSameSum = 0;
        for(let i = 0; i <= 2; i++){
            let rowSum = 0;
            let colSum = 0;
            for(let j = 0; j <= 2; j++){
                rowSum += givenBoard[i][j];
                colSum += givenBoard[j][i];
                if(i == j) diagonalSameSum += givenBoard[i][j];
            }
            if(rowSum == 3 || rowSum == 6){
                invokeIfWon(id, `[${i}][0],[${i}][1],[${i}][2]`);
                return true;
            }
            if(colSum == 3 || colSum == 6){
                invokeIfWon(id, `[0][${i}],[1][${i}],[2][${i}]`); 
                return true;
            }
        }
        if(diagonalSameSum == 3 || diagonalSameSum == 6){
            invokeIfWon(id, `[0][0],[1][1],[2][2]`); 
            return true;
        }
        let antiDiag = givenBoard[0][2] + givenBoard[1][1] + givenBoard[2][0];
        if(antiDiag == 3 || antiDiag == 6){
            invokeIfWon(id, `[0][2],[1][1],[2][0]`); 
            return true;
            
        }
    }

    function createPlayer(id){
        const playerid = id;
        const playerOwnInputArray = Array.from({length: 3}, () => Array(3).fill(undefined));
        const inputValue = (row, col) =>{
            setValue(playerid, row, col, playerOwnInputArray);
            if(checkIfWon(playerid, playerOwnInputArray) ==true){
                return true;
            };
        }
        return {playerid, inputValue, getValueAt}
    }

    const resetPlayers = () =>{
        player1 = createPlayer(1);
        player2 = createPlayer(2);
    }

    resetPlayers();

    return { 
        get player1(){ return player1; }, 
        get player2(){ return player2; },
        checkIfOccupied, resetBoardArray, getEvenOddCounter, incerementEvenOddCounter
    };

})();


const userUI = (function(){
    const clickBtn = document.querySelectorAll(".cell");
    let playerOneName = "";
    let playerTwoName = "";
    const gameInfo = document.querySelector(".gameInfo");

    clickBtn.forEach((button) => button.addEventListener('click', () => {
        let hitIndex = button.dataset.id.split(',');

        if(gameBoard.checkIfOccupied(hitIndex[0], hitIndex[1])){
            return;
        }
        if(gameBoard.getEvenOddCounter() >=9){
            disableButton();
            setPlayerinfo("Draw");
            return;
        }
        if(gameBoard.getEvenOddCounter() % 2 != 0){
            if(gameBoard.player1.inputValue(hitIndex[0], hitIndex[1]) ==true){
                button.textContent = "X";  
                return;
            }
            gameBoard.incerementEvenOddCounter();
            button.textContent = "X";
            setPlayerinfo(`${playerTwoName} Turn`);
        } else if(gameBoard.getEvenOddCounter() % 2 == 0){
            if(gameBoard.player2.inputValue(hitIndex[0], hitIndex[1]) ==true){
                button.textContent = "O";
                return;
            }
            button.textContent = "O";
            gameBoard.incerementEvenOddCounter();
            setPlayerinfo(`${playerOneName} Turn`);
        }
    }))

    function startGame(){
        gameInfo.textContent = `${playerOneName} Turn`;
    }

    const setPlayerinfo = (info) =>{
        gameInfo.textContent = info;
    }

    const getUserPlayerName = (id) =>{
        if(id ==1){
            return playerOneName;
        }else{
            return playerTwoName;
        }
    }
    const setPlayerName = (player1, player2) =>{
        playerOneName = player1;
        playerTwoName = player2;
    }

    const disableButton = () =>{
        clickBtn.forEach(button => button.disabled = true);
    }

    const enableButtons = () =>{
        clickBtn.forEach(button => button.disabled = false);
    }

    return {startGame, disableButton, enableButtons, setPlayerName, setPlayerinfo,getUserPlayerName, clickBtn}
})();


const uiController = (function(){
    const startBtn = document.querySelector(".Start");
    const resetBtn = document.querySelector(".Reset");
    userUI.disableButton();
    const submitBtn = document.querySelector(".submit-form-btn");
    const formDialog = document.getElementById("userNameDialog");

    startBtn.addEventListener('click', () =>{
        clearHitBoxes();
        formDialog.showModal();
        userUI.disableButton();
        
    })

    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        sendUserInfo(
            document.querySelector("#player1Name").value,
            document.querySelector("#player2Name").value
        );
        formDialog.close();
        userUI.enableButtons();
        userUI.startGame();
    })

    const sendUserInfo = (player1, player2) =>{
        userUI.setPlayerName(player1, player2);
    }

    resetBtn.addEventListener("click", () => clearHitBoxes())

    const clearHitBoxes = () =>{
        userUI.clickBtn.forEach(button => {
            button.textContent = "";
            button.disabled = false;
        });
        userUI.setPlayerinfo(`${userUI.getUserPlayerName(1)} Turn`)
        gameBoard.resetBoardArray();
    }

    return { clearHitBoxes }
})();
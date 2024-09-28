// script.js
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let gameMode = 'pvp';

function checkWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i * 3] === gameBoard[i * 3 + 1] && gameBoard[i * 3] === gameBoard[i * 3 + 2] && gameBoard[i * 3] !== '') {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i] === gameBoard[i + 3] && gameBoard[i] === gameBoard[i + 6] && gameBoard[i] !== '') {
            return true;
        }
    }
    // Check diagonals
    if ((gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] && gameBoard[0] !== '') ||
        (gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6] && gameBoard[2] !== '')) {
        return true;
    }
    return false;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        document.getElementById(`cell-${cellIndex}`).innerText = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer === 'X' ? player1Name : player2Name} wins!`);
            resetGame();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            if (gameMode === 'pvc' && currentPlayer === 'O') {
                computerMove();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById('current-player').innerText = `Current Player: ${currentPlayer === 'X' ? player1Name : player2Name}`;
            }
        }
    }
}

function computerMove() {
    // Simple AI logic: choose a random empty cell
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            emptyCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.getElementById('current-player').innerText = `Current Player: ${player1Name}`;
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).innerText = '';
    }
}

// Add event listeners to cells
for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener('click', () => makeMove(i));
}

// Add event listener to start game button
document.getElementById('start-game').addEventListener('click', () => {
    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;
    gameMode = document.getElementById('game-mode').value;
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('start-game-container').style.display = 'none';
});

// Function to make a computer move
function computerMove() {
    if (difficulty === 'easy') {
        let move;
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') return i;
        }
    } else if (difficulty === 'medium') {
        // Medium difficulty AI logic: block the player's winning move or make a random move
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                gameBoard[i] = 'X'; // simulate player's move
                if (checkWin()) {
                    gameBoard[i] = 'O'; // block player's winning move
                    return i;
                } else {
                    gameBoard[i] = ''; // reset cell
                }
            }
        }
        // Make a random move if no blocking opportunity
        let emptyCells = [];
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                emptyCells.push(i);
            }
        }
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    } else {
        // Hard difficulty AI logic: use minimax algorithm
        // TO DO: Implement minimax algorithm
    }
}

// Function to update scoreboard
function updateScoreboard() {
    if (playerScore > computerScore) {
        document.getElementById('winner').innerText = `Player ${player1Name} wins the game!`;
    } else if (playerScore < computerScore) {
        document.getElementById('winner').innerText = `Computer wins the game!`;
    } else {
        document.getElementById('winner').innerText = `It's a tie!`;
    }
}

// Function to reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    document.getElementById('player-score').innerText = `Player Score: 0`;
    document.getElementById('computer-score').innerText = `Computer Score: 0`;
    document.getElementById('round-number').innerText = `Round: 1/3`;
    resetBoard();
}

// Add event listener to start game button
document.getElementById('start-game').addEventListener('click', () => {
    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;
    gameMode = document.getElementById('game-mode').value;
    difficulty = document.getElementById('difficulty').value;
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('start-game-container').style.display = 'none';
    resetGame();
});

// Add event listener to reset game button
document.getElementById('reset-game').addEventListener('click', resetGame);
// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    playerScore = 0;
    computerScore = 0;
    currentPlayer = 'X';
    document.getElementById('game-board').innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.addEventListener('click', handleCellClick);
        document.getElementById('game-board').appendChild(cell);
    }
    document.getElementById('winner').innerText = '';
}

// Function to update scoreboard
function updateScoreboard() {
    if (gameMode === 'single-player') {
        if (playerScore > computerScore) {
            document.getElementById('winner').innerText = `Player ${player1Name} wins the game!`;
        } else if (playerScore < computerScore) {
            document.getElementById('winner').innerText = `Computer wins the game!`;
        } else {
            document.getElementById('winner').innerText = `It's a tie!`;
        }
    } else if (gameMode === 'two-player') {
        if (playerScore > computerScore) {
            document.getElementById('winner').innerText = `Player ${player1Name} wins the game!`;
        } else if (playerScore < computerScore) {
            document.getElementById('winner').innerText = `Player ${player2Name} wins the game!`;
        } else {
            document.getElementById('winner').innerText = `It's a tie!`;
        }
    }
}

document.getElementById('start-game').addEventListener('click', () => {
    player1Name = document.getElementById('player1-name').value;
    player2Name = document.getElementById('player2-name').value;
    gameMode = document.getElementById('game-mode').value;
    difficulty = document.getElementById('difficulty').value;
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('start-game-container').style.display = 'none';
    resetGame();
});

// Function to update scoreboard
function updateScoreboard() {
    if (playerScore > computerScore) {
        document.getElementById('winner').innerText = `Player ${player1Name} wins the game!`;
    } else if (playerScore < computerScore) {
        document.getElementById('winner').innerText = `Computer wins the game!`;
    } else {
        document.getElementById('winner').innerText = `It's a tie!`;
    }
}

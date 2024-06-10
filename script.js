document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('.status');
    const restartBtn = document.getElementById('restart');
    let currentPlayer = 'x';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[cellIndex] !== '' || !isGameActive()) {
            return;
        }

        updateCell(cell, cellIndex);
        checkResult();
    }

    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winConditions.length; i++) {
            const winCondition = winConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `${currentPlayer.toUpperCase()} has won!`;
            endGame();
        } else if (!gameState.includes('')) {
            statusText.textContent = 'Draw!';
            endGame();
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            statusText.textContent = `It's ${currentPlayer.toUpperCase()}'s turn`;
        }
    }

    function endGame() {
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    function isGameActive() {
        return !statusText.textContent.includes('won') && !statusText.textContent.includes('Draw');
    }

    function restartGame() {
        currentPlayer = 'x';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusText.textContent = `It's ${currentPlayer.toUpperCase()}'s turn`;
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.addEventListener('click', handleCellClick);
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);

    restartGame();
});

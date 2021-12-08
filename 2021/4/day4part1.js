function getBoards(fileString) {
    // TODO figure this out
    return fileString.split('\n\n');
}

function getWinningBoard(draws, boards) {
    let winner;
    for (i=0; i<draws.length; i++) {
        for (j=0; j<boards.length; j++) {
            const index = boards[j].indexOf(draws[i]);
            if (index !== -1) {
                boards[j][index] *= -1;
            }
        }

        winner = checkForWinner(boards);
        if (winner) return winner;
    }

    function checkForWinner(boards) {
        boards.forEach(board => {
            // TODO check bingo win
        });
    }

    return winner;
}

function getWinningScore(board, finalDraw) {
    const boardSum = board.filter(x => x > 0).reduce((prev, cur) => prev + cur);
    return boardSum * finalDraw;
}

const fs = require('fs');
const fileString = fs.readFileSync('./test.txt').toString().trim();
const draws = fileString.split('\n')[0].split(',');
const boards = getBoards(fileString);
console.log(boards);
// const winner = getWinningBoard(draws, boards);
// console.log(winner);
// console.log(getWinningScore(winner));
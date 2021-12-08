function getBoards(fileString) {
    var splitFile = fileString.split('\n\n');
    let boards = [];
    for (let i=1; i<splitFile.length; i++) {
        const board = splitFile[i].split('\n');
        let boardArray = [];
        board.forEach(line => {
            boardArray.push(line.trim().split(/\s+/).map(Number));
        });
        boards.push(boardArray);
    }

    return boards;
}

function getWinningBoard(draws, boards) {
    let winner;
    for (let i=0; i<draws.length; i++) {
        for (let j=0; j<boards.length; j++) {
            for (let k=0; k<boards[j].length; k++) {
                const index = boards[j][k].indexOf(draws[i]);
                if (index !== -1) {
                    boards[j][k][index] *= -1;
                }
            }
        }

        winner = checkForWinner(boards);
        if (winner) return [winner, draws[i]];
    }

    return undefined;
}

function checkForWinner(boards) {
    let winningBoard;
    for (let i=0; i<boards.length; i++) {
        for (let j=0; j<boards[i].length; j++) {
            // horizontal checks
            if (boards[i][j].filter(x => x < 0).length === boards[i][j].length) {
                return boards[i];
            }
    
            // vertical checks
            let verticalCount = 0;
            for (let k=0; k<boards[i].length; k++) {
                if (boards[i][k][j] < 0) verticalCount++;
    
                if (verticalCount === boards[i][j].length) {
                    return boards[i];
                }
            }
        }
    }

    return winningBoard;
}

function getWinningScore(board, finalDraw) {
    let boardSum = 0;
    board.forEach(line => {
        let filteredLine = line.filter(x => x > 0);
        if (filteredLine.length > 0) {
            boardSum += filteredLine.reduce((prev, cur) => prev + cur);
        }
    });
    return boardSum * finalDraw;
}

const fs = require('fs');
const fileString = fs.readFileSync('./input.txt').toString().trim();
const draws = fileString.split('\n')[0].split(',').map(Number);
const boards = getBoards(fileString);
const winner = getWinningBoard(draws, boards);
console.log(getWinningScore(winner[0], winner[1]));
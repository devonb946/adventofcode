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

function getLastWinningBoard(draws, boards) {
    let winnersList = [];
    let winnersIndices = [];
    let winningDraws = [];
    for (let i=0; i<draws.length; i++) {
        for (let j=0; j<boards.length; j++) {
            for (let k=0; k<boards[j].length; k++) {
                const index = boards[j][k].indexOf(draws[i]);
                if (index !== -1) {
                    boards[j][k][index] *= -1;
                }
            }
        }

        let tempWinners = checkForWinners(boards, winnersIndices);
        if (tempWinners[0].length > 0) {
            winnersList = winnersList.concat(tempWinners[0]);
            winnersIndices = winnersIndices.concat(tempWinners[1]);
            winningDraws.push(draws[i]);
        }
    }

    return [winnersList.pop(), winningDraws.pop()];
}

function checkForWinners(boards, winnersIndices) {
    let winningBoards = [];
    let indices = []
    for (let i=0; i<boards.length; i++) {
        if (winnersIndices.includes(i)) {
            continue;
        }
        boardLineLoop:
            for (let j=0; j<boards[i].length; j++) {
                // horizontal checks
                if (boards[i][j].filter(x => x < 0).length === boards[i][j].length) {
                    winningBoards.push(boards[i].map((a) => a.slice()));
                    indices.push(i);
                    break boardLineLoop;
                }
        
                // vertical checks
                let verticalCount = 0;
                for (let k=0; k<boards[i].length; k++) {
                    if (boards[i][k][j] < 0) verticalCount++;
        
                    if (verticalCount === boards[i][j].length) {
                        winningBoards.push(boards[i].map((a) => a.slice()));
                        indices.push(i);
                        break boardLineLoop;
                    }
                }
            }
    }

    return [winningBoards, indices];
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
const winner = getLastWinningBoard(draws, boards);
console.log(getWinningScore(winner[0], winner[1]));
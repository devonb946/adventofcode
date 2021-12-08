function getCoordPairs(fileString) {
    let pairs = [];
    const lines = fileString.split('\n');
    lines.forEach(line => {
        let pairStrings = line.split(' -> ');
        let pair = pairStrings.map(str => str.split(',').map(Number))
        pairs.push(pair);
    });

    return pairs;
}

function countOverlaps(coordPairs) {
    let count = 0;



    return count;
}

const fs = require('fs');
const fileString = fs.readFileSync('./test.txt').toString().trim();
const coordPairs = getCoordPairs(fileString);
console.log(countOverlaps(coordPairs));
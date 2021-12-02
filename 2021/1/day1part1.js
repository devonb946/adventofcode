function getDepthIncreaseCount(depths) {
    let prevDepth;
    let increaseCount = 0;
    depths.forEach(depth => {
        depth = Number(depth);
        if (prevDepth && prevDepth < depth) {
            increaseCount++;
        }
        prevDepth = depth;
    });

    return increaseCount;
}

const fs = require('fs');
const depths = fs.readFileSync('./input.txt').toString().split('\n');
console.log(getDepthIncreaseCount(depths));
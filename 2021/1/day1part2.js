function getThreesIncreaseCount(depths) {
    let prevSum;
    let increaseCount = 0;
    for (i=2; i<depths.length; i++) {
        const sum = Number(depths[i-2]) + Number(depths[i-1]) + Number(depths[i]);
        if (prevSum && prevSum < sum) {
            increaseCount++;
        }
        prevSum = sum;
    }

    return increaseCount;
}

const fs = require('fs');
const depths = fs.readFileSync('./input.txt').toString().split('\n');
console.log(getThreesIncreaseCount(depths));
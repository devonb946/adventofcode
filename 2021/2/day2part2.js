function calculatePosition(instructions) {
    let depthPos = horizontalPos = aim = 0;
    instructions.forEach(instruction => {
        const split = instruction.split(' ');
        const direction = split[0];
        const vector = Number(split[1]);

        if (direction === 'up') {
            aim -= vector;
        } else if (direction === 'down') {
            aim += vector;
        } else { // forward
            horizontalPos += vector;
            depthPos += aim * vector;
        }
    });

    return depthPos * horizontalPos;
}

const fs = require('fs');
const instructions = fs.readFileSync('./input.txt').toString().trim().split('\n');
console.log(calculatePosition(instructions));

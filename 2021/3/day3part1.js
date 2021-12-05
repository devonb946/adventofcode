function checkPowerConsumption(gammaRate, epsilonRate) {
    return gammaRate * epsilonRate;
}

function getRates(report) {
    let bitCounts;
    report.forEach(line => {
        let bits = line.split('').map(Number);
        if (bitCounts) {
            for (i=0; i<bits.length; i++) {
                if (bits[i] === 1) bitCounts[i]++;
            }
        } else {
            bitCounts = bits;
        }
    });

    let gammaBits = []
    let epsilonBits = []
    bitCounts.forEach(count => {
        if (count > report.length - count) {
            gammaBits.push(1)
            epsilonBits.push(0);
        } else {
            gammaBits.push(0);
            epsilonBits.push(1);
        }
    });

    return [parseInt(gammaBits.join(''), 2), parseInt(epsilonBits.join(''), 2)];
}

const fs = require('fs');
const report = fs.readFileSync('./input.txt').toString().trim().split('\n');
const rates = getRates(report);
console.log(checkPowerConsumption(rates[0], rates[1]));

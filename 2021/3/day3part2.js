function verifyLifeSupportRating(oxygenGenRating, co2scrubberRating) {
    return oxygenGenRating * co2scrubberRating;
}

function getRates(report) {
    let oxygenBits = report.slice();
    let co2Bits = report.slice();
    let filterCount = 0;
    let oxygenOnesCount = 0;
    let co2OnesCount = 0;
    let oxygenGenRating;
    let co2scrubberRating;
    while (filterCount < report[0].length) {
        for (i=0; i<oxygenBits.length; i++) {
            if (oxygenBits[i].charAt(filterCount) === '1') {
                oxygenOnesCount++;
            }
        }

        for (i=0; i<co2Bits.length; i++) {
            if (co2Bits[i].charAt(filterCount) === '1') {
                co2OnesCount++;
            }
        }

        if (oxygenOnesCount >= oxygenBits.length - oxygenOnesCount) {
            oxygenBits = oxygenBits.filter(x => x.charAt(filterCount) === '1');
        } else {
            oxygenBits = oxygenBits.filter(x => x.charAt(filterCount) === '0');
        }

        if (co2OnesCount >= co2Bits.length - co2OnesCount) {
            co2Bits = co2Bits.filter(x => x.charAt(filterCount) === '0');
        } else {
            co2Bits = co2Bits.filter(x => x.charAt(filterCount) === '1');
        }

        if (oxygenBits.length === 1) {
            oxygenGenRating = parseInt(oxygenBits.join(''), 2);
        }
        if (co2Bits.length === 1) {
            co2scrubberRating = parseInt(co2Bits.join(''), 2);
        }

        if (oxygenGenRating && co2scrubberRating) {
            return [oxygenGenRating, co2scrubberRating];
        }

        oxygenOnesCount = 0;
        co2OnesCount = 0;
        filterCount++;
    }

    return [oxygenGenRating, co2scrubberRating];
}

const fs = require('fs');
const report = fs.readFileSync('./input.txt').toString().trim().split('\n');
const rates = getRates(report);
console.log(verifyLifeSupportRating(rates[0], rates[1]));
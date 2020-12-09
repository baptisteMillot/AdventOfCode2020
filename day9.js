var fs = require('fs');

const STEP = 25;

module.exports.day9 = () => {
    fs.readFile('./inputs/day9.txt', "utf8", (err, data) => {
        const numberList = data
            .split("\r\n")
            .filter(n => n)
            .map(n => parseInt(n));

        let index = STEP;
        let solutionPartOne = 0;
        while(solutionPartOne === 0) {
            let hasFindValue = false;
            const numberToFind = numberList[index];
            const numberToCalculList = numberList.slice(index - STEP, index);
            numberToCalculList.forEach(number => {
                for (const numberToAdd of numberToCalculList) {
                    if (number + numberToAdd === numberToFind) {
                        hasFindValue = true;
                    }
                }
            });

            if (!hasFindValue) {
                solutionPartOne = numberToFind;
            }
            index++;
        }

        let startIndex = 0;
        let allValueToResult = [];
        let result = 0;
        while(result !== solutionPartOne) {
            result = 0;
            allValueToResult = [];
            const numberToCalculList = numberList.slice(startIndex);
            for (const number of numberToCalculList) {
                result += number;
                allValueToResult.push(number);
                if (result >= solutionPartOne) {
                    break;
                }
            }
            startIndex++;
        }

        const allValueSorted = allValueToResult.sort((a, b) => a - b);
        const solutionPartTwo = allValueSorted[0] + allValueSorted[allValueSorted.length - 1];

        console.log(`Solution part two : ${solutionPartTwo}`);

    });
};

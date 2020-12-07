var fs = require('fs');

module.exports.daySix = () => {
    fs.readFile('./inputs/daySix.txt', "utf8", (err, data) => {
        const answerByGroup = data
            .split("\r\n\r\n")
            .filter(p => p)
            .map(g => g.split("\r\n").filter(a => a));

        const solutionPartOne = answerByGroup
            .map(g => g.flatMap(a => a.split("")))
            .map(g => [...new Set(g)].length)
            .reduce((acc, currentValue) => acc + currentValue);

        const solutionPartTwo = answerByGroup.reduce((acc, currentValue) => {
            const numberOfPersonInGroup = currentValue.length;
            if (numberOfPersonInGroup === 1) {
                return acc + currentValue[0].split("").length;
            }

            const answerByGroupByQuestion = currentValue.flatMap(v => v.split("")).reduce((accValue, current) => {
                (current in accValue) ? (accValue[current]++) : (accValue[current] = 1);
                return accValue;
            }, {});

            const countAnswerByGroup = Object.entries(answerByGroupByQuestion).reduce((prev, [_, value]) => {
                return value === numberOfPersonInGroup ? prev + 1 : prev;
            }, 0);

            return acc + countAnswerByGroup;
        }, 0);

        console.log(`Part one : ${solutionPartOne}`);
        console.log(`Part two : ${solutionPartTwo}`);
    });
};

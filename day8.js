var fs = require('fs');

const BAG_TO_FIND = "shiny gold";

module.exports.day8 = () => {
    fs.readFile('./inputs/day8.txt', "utf8", (err, data) => {
        const instructionList = data
            .split("\r\n")
            .filter(i => i)
            .map(i => i.split(" "))
            .map(i => ({
                instruction: i[0],
                number: parseInt(i[1]),
            }));

        console.log(`Solution part one : ${executeCode(instructionList).solution}`);

        let resultPartTwo = {solution: 0, lastIndex: 0 };
        let lastIndexChanged = 0;
        while(resultPartTwo.lastIndex < instructionList.length) {
            while(instructionList[lastIndexChanged].instruction === "acc" || instructionList[lastIndexChanged].number === 0) {
                lastIndexChanged++;
            }

            const newInstructionList = JSON.parse(JSON.stringify(instructionList));
            newInstructionList[lastIndexChanged].instruction === "nop" ? newInstructionList[lastIndexChanged].instruction = "jmp" : newInstructionList[lastIndexChanged].instruction = "nop";

            resultPartTwo = executeCode(newInstructionList);
            lastIndexChanged++;
        }

        console.log(`Solution part two : ${resultPartTwo.solution}`);
    });
};

const executeCode = (instructionList) => {
    const indexVisited = [];
    let newIndex = 0;
    let solution = 0;

    while(!indexVisited.includes(newIndex) && newIndex <= instructionList.length - 1) {
        indexVisited.push(newIndex)
        const instruction = instructionList[newIndex];

        switch (instruction.instruction) {
            case "nop":
                newIndex++;
                break;
            case "acc":
                solution += instruction.number;
                newIndex++;
                break;
            case "jmp":
                newIndex += instruction.number;
                break;
        }
    }

    return {solution: solution, lastIndex: newIndex};
}

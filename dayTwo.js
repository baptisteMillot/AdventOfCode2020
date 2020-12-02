var fs = require('fs');

class PasswordPolicy {
    constructor(intervalPolicy, letter, password) {
        const minMaxPolicy = intervalPolicy.split("-");

        const minChar = parseInt(minMaxPolicy[0]);
        const maxChar = parseInt(minMaxPolicy[1]);
        const letterToFind = letter.split(":")[0];
        const passwordArray = [...password];

        const numberOfLetterPartOne = passwordArray.filter(p => p === letterToFind).length
        this.hasEnoughLetter = numberOfLetterPartOne >= minChar && numberOfLetterPartOne <= maxChar;

        this.hasOnlyOneLetterAtPosition = passwordArray[minChar - 1] === letterToFind ^ passwordArray[maxChar - 1] === letterToFind;
    }
}

module.exports.dayTwo = () => {
    fs.readFile('./inputs/dayTwo.txt', "utf8", (err, data) => {
        const passwordPolicyList = data
            .split("\n")
            .map(p => p.split(" "))
            .filter(p => p[2])
            .map(p => new PasswordPolicy(p[0], p[1], p[2]));

        const validPasswordPartOne = passwordPolicyList.filter(p => p.hasEnoughLetter);
        console.log(validPasswordPartOne.length)

        const validPasswordPartTwo = passwordPolicyList.filter(p => p.hasOnlyOneLetterAtPosition);
        console.log(validPasswordPartTwo.length)
    });
};

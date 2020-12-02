var fs = require('fs');

class PasswordPolicy {
    constructor(intervalPolicy, letter, password) {
        const minMaxPolicy = intervalPolicy.split("-");

        const minChar = parseInt(minMaxPolicy[0]);
        const maxChar = parseInt(minMaxPolicy[1]);
        const letterToFind = letter.split(":")[0];
        const numberOfLetter = [...password].filter(p => p === letterToFind).length
        this.hasEnoughLetter = numberOfLetter >= minChar && numberOfLetter <= maxChar;
    }
}

module.exports.dayTwo = () => {
    fs.readFile('./inputs/dayTwo.txt', "utf8", (err, data) => {
        const passwordWithEnoughChar = data
            .split("\n")
            .map(p => p.split(" "))
            .filter(p => p[2])
            .map(p => new PasswordPolicy(p[0], p[1], p[2]))
            .filter(p => p.hasEnoughLetter);

        console.log(passwordWithEnoughChar.length)
    });
};

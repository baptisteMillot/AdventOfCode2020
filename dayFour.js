var fs = require('fs');

const validateBirthDate = (birthDate) => {
    const birthDateValue = parseInt(birthDate);

    return birthDateValue.toString().length === 4 && birthDateValue >= 1920 && birthDateValue <= 2002;
};

const validateIssueYear = (issueYear) => {
    const issueYearValue = parseInt(issueYear);

    return issueYearValue.toString().length === 4 && issueYearValue >= 2010 && issueYearValue <= 2020;
};

const validateExpirationYear = (expirationYear) => {
    const expirationYearValue = parseInt(expirationYear);

    return expirationYearValue.toString().length === 4 && expirationYearValue >= 2020 && expirationYearValue <= 2030;
};

const validateHeight = (height) => {
    if (height.includes("cm")) {
        const heighValueCM = parseInt(height.replace("cm", ""));
        return heighValueCM >= 150 && heighValueCM <= 193;
    } else if (height.includes("in")) {
        const heighValueIN = parseInt(height.replace("in", ""));
        return heighValueIN >= 59 && heighValueIN <= 76;
    }

    return false;
};

const validateHairColor = (hairColor) => {
    if (hairColor.includes("#")) {
        const hairColorCode = hairColor.replace("#", "");
        return /[0-9A-Fa-f]{6}/.test(hairColorCode);
    }

    return false;
};

const validateEyeColor = (eyeColor) => {
    const eyeColorValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    return eyeColorValues.find(color => color === eyeColor);
};

const validatepassportId = (passportId) => passportId.length === 9;

const requiredValue = [
    {key: "byr", validationFunction: validateBirthDate},
    {key: "iyr", validationFunction: validateIssueYear},
    {key: "eyr", validationFunction: validateExpirationYear},
    {key: "hgt", validationFunction: validateHeight},
    {key: "hcl", validationFunction: validateHairColor},
    {key: "ecl", validationFunction: validateEyeColor},
    {key: "pid", validationFunction: validatepassportId},
];

module.exports.dayFour = () => {
    fs.readFile('./inputs/dayFour.txt', "utf8", (err, data) => {
        const passportList = data
            .split("\r\n\r")
            .filter(p => p)
            .map(p => p.split(" ").flatMap(pass => pass.replace(/(\r)/gm, "").split("\n")))
            .map(p => p.flatMap(pass => ({key: pass.split(":")[0], value: pass.split(":")[1]})));

        const resultPartOne = passportList.map(p => requiredValue.every(r => p.find(pass => pass.key === r.key))).filter(p => p);
        console.log(`partOne : ${resultPartOne.length}`);

        const resultPartTwo = passportList
            .map(p => requiredValue.every(r => p.find(pass => pass.key === r.key && r.validationFunction(pass.value))))
            .filter(p => p);

        console.log(`partTwo : ${resultPartTwo.length}`);
    });
};

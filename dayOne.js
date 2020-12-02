var fs = require('fs');

const YEAR_TO_FOUND = 2020;
module.exports.dayOne = () => {
    fs.readFile('./inputs/dayOne.txt', "utf8", (err, data) => {
        const yearList = data.split("\n").map(year => parseInt(year));

        const correspondingYear = yearList
        .flatMap(year => yearList.filter(ye => yearList
            .find(y => ye + y + year === YEAR_TO_FOUND)));
        console.log(correspondingYear)
        if (correspondingYear.length) {
            console.log(correspondingYear[0] * correspondingYear[1] * correspondingYear[2])
        }
      });
};

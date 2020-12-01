var fs = require('fs'); 

const YEAR_TO_FOUND = 2020;
module.exports.dayOne = () => {
    fs.readFile('./inputs/dayOne.txt', "utf8", (err, data) => {
        const yearList = data.split("\n").map(year => parseInt(year));
        
        for (let year of yearList){
            const correspondingYear = yearList.filter(y => y !== year && y + year == YEAR_TO_FOUND);
            if (correspondingYear.length) {
                console.log(correspondingYear[0] * year)
                break;
            }
        }
      });
};
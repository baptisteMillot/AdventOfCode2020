var fs = require('fs');

const BAG_TO_FIND = "shiny gold";

module.exports.daySeven = () => {
    fs.readFile('./inputs/daySeven.txt', "utf8", (err, data) => {
        const bagRuleList = data
            .split("\r\n")
            .filter(r => r)
            .map(r => {
                const rule = r.split("contain");
                return {
                    color: rule[0].replace(/bags.|bag./gm, "").trim(),
                    contains: rule[1].replace(/bags\.|bag\./gm, "").trim(),
                }
            });

        let bagCanContainsColorPartOne = findOtherBagCanContain(bagRuleList, [BAG_TO_FIND]);

        let solutionPartOne = bagCanContainsColorPartOne;
        while (bagCanContainsColorPartOne.length !== 0) {
            bagCanContainsColorPartOne = findOtherBagCanContain(bagRuleList, bagCanContainsColorPartOne);
            solutionPartOne = [...new Set(solutionPartOne.concat(bagCanContainsColorPartOne))];
        }
        console.log(`Part one : ${solutionPartOne.length}`);

        let bagCanContainColorPartTwo = findBag(bagRuleList, [{number: 1, color: BAG_TO_FIND}]);

        let solutionPartTwo = bagCanContainColorPartTwo;
        while (bagCanContainColorPartTwo.length !== 0) {
            bagCanContainColorPartTwo = findBag(bagRuleList, bagCanContainColorPartTwo);
            solutionPartTwo = solutionPartTwo.concat(bagCanContainColorPartTwo);
        }

        console.log(`Part two : ${solutionPartTwo.reduce((acc, current) => acc + current.number, 0)}`);
    });
};

const findBag = (bagRuleList, bagColorToFind) => bagRuleList
        .flatMap(b => bagColorToFind
            .map(bc => {
                return {
                    otherBag: b.contains
                        .replace(/" "/gm, "")
                        .split(",")
                        .map(b => b.trim().split(" "))
                        .map(bg => ({number: bc.number * bg[0], color: `${bg[1]} ${bg[2]}`}))
                        .filter(b => !isNaN(b.number)),
                    hasColor: bc.color === b.color
                }
            }))
            .filter(bc => bc.hasColor)
        .flatMap(b => b.otherBag);

const findOtherBagCanContain = (bagRuleList, otherBag) => bagRuleList.filter((bagRule) => otherBag.find(b => bagRule.contains.includes(b))).map(b => b.color);

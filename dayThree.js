var fs = require('fs');

module.exports.dayThree = () => {
    fs.readFile('./inputs/dayThree.txt', "utf8", (err, data) => {
        const map = data
            .split("\n")
            .filter(m => m)
            .map(m => [...m].map(m => m === "#"));

        var numberOfTreePartOne = travel(map, 1, 3);
        console.log(numberOfTreePartOne)

        var numberOfTreePartTwo =
            travel(map, 1, 1)
            * travel(map, 1, 3)
            * travel(map, 1, 5)
            * travel(map, 1, 7)
            * travel(map, 2, 1);
        console.log(numberOfTreePartTwo)
    });
};

const travel = (map, moveDown, moveRight) => {
    const numberOfColumn = map[0].length - 1;

    let width = moveRight;
    let numberOfTree = 0;

    for (var height = moveDown; height < map.length; height += moveDown) {
        const newPostion = map[height][width];
        if (newPostion) {
            numberOfTree += 1;
        }

        width = (width + moveRight) % numberOfColumn;
    }

    return numberOfTree;
}

var fs = require('fs');

module.exports.dayFive = () => {
    fs.readFile('./inputs/dayFive.txt', "utf8", (err, data) => {
        const planeMap = data
            .split("\r\n")
            .filter(p => p)
            .map(p => ({row: p.split(""), result: {minRow: 0, maxRow: 127, minCol: 0, maxCol: 7, valueRow: 128, valueCol: 8}}))
            .map(p => p.row.reduce((acc, currentValue) => {
                let newValue = acc;
                if (acc === "F" || acc === "B") {
                    newValue = getRowAndColumn(acc, p.result);
                }
                newValue = getRowAndColumn(currentValue, newValue);
                return newValue;
            })
        );

        const seatIdList = planeMap.map(p => {
            let result = {col: 0, row: 0};
            if (p.oldValueCol === "R") {
                result = {...result, col: p.maxCol};
            } else if (p.oldValueCol === "L") {
                result = {...result, col: p.minCol};
            }
            if (p.oldValueRow === "F") {
                result = {...result, row: p.minRow};
            } else if (p.oldValueRow === "B") {
                result = {...result, row: p.maxRow};
            }


            return result;
        })
        .map(r => (r.row * 8 + r.col))
        .sort((a, b) => a - b);

        let solutionParTwo = 0;
        for (let i = 0; i < seatIdList.length - 1; i++) {
            if (seatIdList[i] - seatIdList[i + 1] !== -1) {
                solutionParTwo = seatIdList[i] + 1
            }
        }

        console.log(`Part one : ${seatIdList[seatIdList.length - 1]}`);
        console.log(`Part two : ${solutionParTwo}`);
    });
};

const getRowAndColumn = (value, previousValue) => {
    switch (value) {
        case "F":
            previousValue = {...previousValue, valueRow: previousValue.valueRow / 2}
            return {...previousValue, maxRow: previousValue.maxRow - previousValue.valueRow, oldValueRow: value};
        case "B":
            previousValue = {...previousValue, valueRow: previousValue.valueRow / 2}
            return {...previousValue, minRow: previousValue.minRow + previousValue.valueRow, oldValueRow: value};
        case "R":
            previousValue = {...previousValue, valueCol: previousValue.valueCol / 2}
            return {...previousValue, minCol: previousValue.minCol + previousValue.valueCol, oldValueCol: value};
        case "L":
            previousValue = {...previousValue, valueCol: previousValue.valueCol / 2}
            return {...previousValue, maxCol: previousValue.maxCol - previousValue.valueCol, oldValueCol: value};
    }
}

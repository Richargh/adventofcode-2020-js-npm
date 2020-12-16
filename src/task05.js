exports.task05a = highestSeatId;
exports.seatOf = seatOf;

function highestSeatId(boardingPasses) {
    const seatIds = boardingPasses.split("\n")
        .map(line => seatOf(line.trim()).seatId);
    // console.log(seatIds);
    return seatIds.reduce((max, current) => Math.max(max, current));
}

function seatOf(boardingPass) {
    const rowPass = boardingPass.slice(0, 7);
    const colPass = boardingPass.slice(7);

    const row = rowOf(rowPass);
    const col = colOf(colPass);
    const seatId = seatIdOf(row, col);

    return {row, col, seatId};
}

function rowOf(rowPass) {
    let currentRange = {min: 0, max: 127};
    for (let v of rowPass) {
        let middle = currentRange.min + Math.round((currentRange.max - currentRange.min) / 2);
        // console.log(`middle: ${middle}`, currentRange);
        if (v === "F") {
            currentRange = {min: currentRange.min, max: middle - 1};
        } else {
            currentRange = {min: middle, max: currentRange.max};
        }
    }
    return currentRange.min;
}

function colOf(colPass) {
    let currentRange = {min: 0, max: 7};
    for (let v of colPass) {
        let middle = currentRange.min + Math.round((currentRange.max - currentRange.min) / 2);
        // console.log(`middle: ${middle}`, currentRange);
        if (v === "L") {
            currentRange = {min: currentRange.min, max: middle - 1};
        } else {
            currentRange = {min: middle, max: currentRange.max};
        }
    }
    return currentRange.min;
}

function seatIdOf(row, col) {
    return (row * 8) + col;
}

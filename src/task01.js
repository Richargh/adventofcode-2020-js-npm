exports.task01a = function (lines) {
    const expenses = lines.split("\n").map(e => parseInt(e.trim()));

    let result;
    outer:
        for (let i = 0; i < expenses.length; i++) {
            for (let j = 0; j < expenses.length; j++) {
                if (i === j) continue;

                if (expenses[i] + expenses[j] === 2020) {
                    console.log(expenses[i] + " " + expenses[j]);
                    result = expenses[i] * expenses[j];
                    break outer;
                }
            }
        }
    return result;
}

exports.task01b = function (lines) {
    const expenses = lines.split("\n").map(e => parseInt(e.trim()));

    let result;
    outer:
        for (let i = 0; i < expenses.length; i++) {
            for (let j = 0; j < expenses.length; j++) {
                for (let k = 0; k < expenses.length; k++) {
                    if (i === j || i === k || j === k ) continue;

                    if (expenses[i] + expenses[j] + expenses[k] === 2020) {
                        console.log(expenses[i] + " " + expenses[j] + " " + expenses[k]);
                        result = expenses[i] * expenses[j] * expenses[k];
                        break outer;
                    }
                }
            }
        }
    return result;
}
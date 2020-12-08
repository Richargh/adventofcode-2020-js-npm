exports.task01 = function(lines){
    const expenses = lines.split("\n").map(e => parseInt(e.trim()));

    let result;
    outer:
    for(let i = 0; i < expenses.length; i++){
        for(let j = 0; j < expenses.length; j++){
            if(i === j)continue;

            if(expenses[i] + expenses[j] === 2020){
                console.log(expenses[i] +" "+ expenses[j]);
                result = expenses[i] * expenses[j];
                break outer;
            }
        }
    }
    return result;
}
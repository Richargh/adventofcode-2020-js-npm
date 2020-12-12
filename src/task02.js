exports.partition02a = function (lines) {
    const passwordsAndPolicies = lines.split("\n")
        .map(line => line.trim())
        .map(line => partitionLine(line))

    return passwordsAndPolicies;
}

function partitionLine(line){
    console.log(line);
    const [policy, password] = line.split(": ");
    const [minmax, letter] = policy.split(" ");
    const [minStr, maxStr] = minmax.split("-");
    const min = parseInt(minStr);
    const max = parseInt(maxStr);
    return {
        policy: {
            min,
            max,
            letter
        },
        password
    }
}

exports.task02a = countValidPasswords;
exports.partition02a = partitionLines;
exports.isPasswordValid02a = isPasswordValid;

function countValidPasswords(text){
    const passwordWithPolicies = partitionLines(text);
    return passwordWithPolicies.filter(isPasswordValid).length;
}

function partitionLines(text) {
    return text.split("\n")
        .map(line => line.trim())
        .map(line => partitionLine(line));
}

function partitionLine(line){
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

function isPasswordValid(passwordWithPolicy){
    let letterCount = passwordWithPolicy.password.split(passwordWithPolicy.policy.letter).length - 1;
    return passwordWithPolicy.policy.min <= letterCount && letterCount <= passwordWithPolicy.policy.max
}

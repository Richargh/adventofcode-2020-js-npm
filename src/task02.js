exports.task02a = countValidMinMaxPasswords;
exports.task02b = countValidXorPasswords;
exports.partition02a = partitionLines;
exports.isPasswordValid02a = isMinMaxPasswordValid;
exports.isPasswordValid02b = isXorPasswordValid;

function countValidMinMaxPasswords(text){
    const passwordWithPolicies = partitionLines(text);
    return passwordWithPolicies.filter(isMinMaxPasswordValid).length;
}

function countValidXorPasswords(text){
    const passwordWithPolicies = partitionLines(text);
    return passwordWithPolicies.filter(isXorPasswordValid).length;
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

function isMinMaxPasswordValid(passwordWithPolicy){
    let letterCount = passwordWithPolicy.password.split(passwordWithPolicy.policy.letter).length - 1;
    return passwordWithPolicy.policy.min <= letterCount && letterCount <= passwordWithPolicy.policy.max
}

function isXorPasswordValid(passwordWithPolicy){
    let hasFirstLetter = passwordWithPolicy.password[passwordWithPolicy.policy.min - 1] === passwordWithPolicy.policy.letter;
    let hasSecondLetter = passwordWithPolicy.password[passwordWithPolicy.policy.max - 1] === passwordWithPolicy.policy.letter;
    return (hasFirstLetter && !hasSecondLetter) || (!hasFirstLetter && hasSecondLetter);
}
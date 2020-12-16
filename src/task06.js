exports.task06a = sumOfGroupAnswersAnyoneSaidYesTo;
exports.task06b = sumOfGroupAnswersEveryoneSaidYesTo;
exports.extractGroupAnswers = extractGroupAnswers;

function sumOfGroupAnswersAnyoneSaidYesTo(customsAnswers) {
    const groupAnswers = extractGroupAnswers(customsAnswers)
    const anyonegroupAnswers = groupAnswers.map(answersAnyoneSaidYesTo);
    const groupAnswerSums = anyonegroupAnswers
        .map(groupAnswer => groupAnswer.size);
    return groupAnswerSums.reduce((acc, current) => acc + current);
}

function answersAnyoneSaidYesTo(groupAnswer) {
    return new Set(groupAnswer.answersPerPerson.flat());
}

function sumOfGroupAnswersEveryoneSaidYesTo(customsAnswers) {
    const groupAnswers = extractGroupAnswers(customsAnswers)
    const everyonegroupAnswers = groupAnswers.map(answersEveryoneSaidYesTo)

    const groupAnswerSums = everyonegroupAnswers
        .map(groupAnswer => groupAnswer.length);
    return groupAnswerSums.reduce((acc, current) => acc + current);
}

function answersEveryoneSaidYesTo(groupAnswer) {
    let answerCount = {};
    groupAnswer.answersPerPerson.forEach(answers => {
        answers.forEach(answer => {
            let currentCount = answerCount[answer];
            if (currentCount)
                answerCount[answer] = currentCount + 1;
            else
                answerCount[answer] = 1;
        });
    });

    const everyone = groupAnswer.answersPerPerson.length
    let answersEveryoneSaidYesTo = []
    Object.getOwnPropertyNames(answerCount).forEach(answer => {
        if (answerCount[answer] === everyone)
            answersEveryoneSaidYesTo.push(answer);
    });

    return answersEveryoneSaidYesTo;
}

function extractGroupAnswers(customsAnswers) {
    const rawGroups = customsAnswers.split("\n\n");
    const groupAnswers = rawGroups
        .map(rawGroupAnswers => extractGroupAnswer(rawGroupAnswers));
    return groupAnswers;
}

function extractGroupAnswer(rawGroupAnswers) {
    const answersPerPerson = rawGroupAnswers
        .split(/\n/)
        .map(answers => answers.trim())
        .map(answers => answers.split(""));

    return {answersPerPerson};
}
exports.task06a = sumOfGroupAnswersAnyoneSaidYesTo;
exports.extractGroupAnswers = extractGroupAnswers;

function sumOfGroupAnswersAnyoneSaidYesTo(customsAnswers) {
    const groupAnswers = extractGroupAnswers(customsAnswers)
    const anyonegroupAnswers = groupAnswers
        .map(value => value.individualAnswers.flat())
        .map(value => new Set(value));
    const groupAnswerSums = anyonegroupAnswers
        .map(groupAnswer => groupAnswer.size);
    return groupAnswerSums.reduce((acc, current) => acc + current);
}

function extractGroupAnswers(customsAnswers) {
    const rawGroups = customsAnswers.split("\n\n");
    const groupAnswers = rawGroups
        .map(rawGroupAnswers => extractGroupAnswer(rawGroupAnswers));
    console.log(groupAnswers);
    return groupAnswers;
}
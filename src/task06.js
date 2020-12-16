exports.task06a = sumOfGroupAnswersAnyoneSaidYesTo;
exports.extractGroupAnswers = extractGroupAnswers;

function sumOfGroupAnswersAnyoneSaidYesTo(customsAnswers) {
    const anyonegroupAnswers = extractGroupAnswers(customsAnswers)
        .map(groupAnswer => new Set(groupAnswer));
    const groupAnswerSums = anyonegroupAnswers.map(groupAnswer => groupAnswer.size);
    return groupAnswerSums.reduce((acc, current) => acc + current);
}

function extractGroupAnswers(customsAnswers) {
    const rawGroupAnswers = customsAnswers.split("\n\n");
    const groupAnswers = rawGroupAnswers
        .map(rawGroupAnswer => rawGroupAnswer
            .replace(/\n/g, "")
            .replace(/\s/g, "")
            .trim()
            .split(""));
    return groupAnswers;
}
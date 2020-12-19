exports.task07a = bagsThatContain;
exports.extractAllBagRules = extractAllBagRules;

function bagsThatContain(bagName, rawTotalRules) {
    const bagRules = extractAllBagRules(rawTotalRules);
    const invertedBagRules = invertBagRules(bagRules);
    const bagContainers = bagThatContainsBag(bagName, invertedBagRules);
    console.log(bagContainers);

    return bagContainers.size;
}

function bagThatContainsBag(bagName, invertedBagRules){
    const containingBags = new Set([ ...invertedBagRules[bagName]]);
    for(let containingBag of containingBags){
        const nextContainer = invertedBagRules[containingBag];
        if(nextContainer)
            nextContainer.forEach(container => containingBags.add(container))
    }

    return containingBags;
}

function invertBagRules(bagRules){
    const inverted = {};
    Object.getOwnPropertyNames(bagRules).forEach(outerBagKey => {
        const bagRule = bagRules[outerBagKey];
        Object.getOwnPropertyNames(bagRule).forEach(innerBagKey => {
            if(inverted.hasOwnProperty(innerBagKey))
                inverted[innerBagKey].push(outerBagKey)
            else
                inverted[innerBagKey] = [outerBagKey];
        });
    });

    return inverted;
}

function extractAllBagRules(rawTotalRules) {
    return rawTotalRules
        .split(/\n/)
        .map(extractBagRules)
        .reduce((bags, bag) => {
            return {...bags, ...bag}
        }, {});
}

function extractBagRules(rawBagRules) {
    // bright white bags contain 1 shiny gold bag.
    // light red bags contain 1 bright white bag, 2 muted yellow bags.
    // dotted black bags contain no other bags.
    const [rawBagName, rawJoinedRules] = rawBagRules.split("bags contain");
    const bagName = rawBagName.trim();
    const rules = extractRules(rawJoinedRules);
    const bag = {}
    bag[bagName] = rules;
    return bag;
}

const ruleRegex = /(?<num>[0-9]+)\s(?<bagName>[a-zA-Z ]+)/;

function extractRules(rawJoinedRules) {
    if(rawJoinedRules.includes("no other"))
        return {};

    const rawRules = rawJoinedRules.replace(".", "").split(",");
    const cleanRules = rawRules
        .map(rawRule => rawRule.replace("bags", "").replace("bag", "").trim())
    return cleanRules.reduce((rules, cleanRule) => {
        const groups = ruleRegex.exec(cleanRule).groups;
        const num = parseInt(groups.num, 10);
        const bagName = groups.bagName;
        rules[bagName] = num;
        return rules;
    }, {});
}
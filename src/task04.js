exports.task04a = countValidPassports;
exports.extractPassports = extractPassports;

function countValidPassports(text) {
    const passports = extractPassports(text);
    return passports.filter(isValid).length;
}

function isValid(passport){
    return passport.hasOwnProperty("ecl")
        && passport.hasOwnProperty("pid")
        && passport.hasOwnProperty("eyr")
        && passport.hasOwnProperty("hcl")
        && passport.hasOwnProperty("byr")
        && passport.hasOwnProperty("iyr")
        && passport.hasOwnProperty("hgt");
}

function extractPassports(text){
    const v = text.split("\n\n")
        .map(passport => extractPassport(passport));
    return v;
}

function extractPassport(passportTex){
    const keyValues = passportTex.replace(/\n/g, " ").trim().split(" ");

    let passport = {};
    keyValues.forEach(kv => {
        const [key, value] = kv.split(":");
        passport[key] = value;
    })
    return passport;
}
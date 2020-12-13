exports.task04a = countFieldsPresentPassports;
exports.task04b = countFieldsValidPassports;

exports.extractPassports = extractPassports;
exports.validateFields = validateFields;

function countFieldsPresentPassports(text) {
    const passports = extractPassports(text);
    return passports.filter(hasAllRequiredFields).length;
}

function countFieldsValidPassports(text) {
    const passports = extractPassports(text);
    return passports.filter(areFieldsValid).length;
}


function areFieldsValid(passport) {
    if (!hasAllRequiredFields(passport))
        return false;

    const validity = validateFields(passport);
    return Object.getOwnPropertyNames(validity).reduce((acc, key) => acc && validity[key]);
}

const hgtRegex = /^(?<num>[0-9]+)(?<unit>cm|in)$/;
const hclRegex = /^(#)([0-9a-f]{6})$/;
const eclRegex = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
const pidRegex = /^([0-9]{9})$/;

function validateFields(passport){
    const byr = parseInt(passport["byr"], 10);
    const iyr = parseInt(passport["iyr"], 10);
    const eyr = parseInt(passport["eyr"], 10);

    const hgt = hgtRegex.exec(passport["hgt"]);

    const hcl = hclRegex.exec(passport["hcl"]);
    const ecl = eclRegex.exec(passport["ecl"]);
    const pid = pidRegex.exec(passport["pid"]);

    return  {
        byr: !Number.isNaN(byr) && 1920 <= byr && byr <= 2002,
        iyr: !Number.isNaN(iyr) && 2010 <= iyr && iyr <= 2020,
        eyr: !Number.isNaN(eyr) && 2020 <= eyr && eyr <= 2030,
        hgt: isHeightValid(hgt),
        hcl: hcl != null,
        ecl: ecl != null,
        pid: pid != null
    };
}

function hasAllRequiredFields(passport) {
    return passport.hasOwnProperty("ecl")
        && passport.hasOwnProperty("pid")
        && passport.hasOwnProperty("eyr")
        && passport.hasOwnProperty("hcl")
        && passport.hasOwnProperty("byr")
        && passport.hasOwnProperty("iyr")
        && passport.hasOwnProperty("hgt");
}

function isHeightValid(heightMatch) {
    const num = parseInt(heightMatch?.groups?.num, 10)
    const unit = heightMatch?.groups?.unit;
    if (Number.isNaN(num) || unit === undefined || unit === null)
        return false;

    if (unit === "cm")
        return 150 <= num && num <= 193
    if (unit === "in")
        return 59 <= num && num <= 76;
    // else does not happen
}

function extractPassports(text) {
    return text.split("\n\n")
        .map(passport => extractPassport(passport));
}

function extractPassport(passportTex) {
    const keyValues = passportTex.replace(/\n/g, " ").trim().split(" ");

    let passport = {};
    keyValues.forEach(kv => {
        const [key, value] = kv.split(":");
        passport[key] = value;
    })
    return passport;
}
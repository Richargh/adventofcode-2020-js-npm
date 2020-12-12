const expect = require("chai").expect;
const {task02a, partition02a} = require("../src/task02");

// see https://adventofcode.com/2020/day/2
describe("find the passwords that satisfy corporate policy", function () {
    describe("parse password and policy", function () {
        it("single line", function () {
            // act
            const text = `1-3 a: abcde`;

            // act
            const result = partition02a(text);

            // assert
            expect(result[0]).to.eql({ policy: {letter: "a", min: 1, max: 3}, password: "abcde"});
        });

        it("multiple lines", function () {
            // act
            const text = `1-3 a: abcde
            1-3 b: cdefg
            2-9 c: ccccccccc`;
            const result = partition02a(text);

            // assert
            expect(result[0]).to.eql({ policy: {letter: "a", min: 1, max: 3}, password: "abcde"});
            expect(result[1]).to.eql({ policy: {letter: "b", min: 1, max: 3}, password: "cdefg"});
            expect(result[2]).to.eql({ policy: {letter: "c", min: 2, max: 9}, password: "ccccccccc"});
        });
    });

});


const passwords = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

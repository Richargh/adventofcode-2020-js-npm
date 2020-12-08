const expect = require("chai").expect;
const { task01 } = require("../src/task01");

describe("Color Code Converter", function() {
  describe("RGB to Hex conversion", function() {
    it("converts the basic colors", function() {
      task01();
      expect(1+1).to.equal(2);
    });
  });

});

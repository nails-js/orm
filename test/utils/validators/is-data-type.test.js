const { expect } = require("chai");
const isDataType = require("../../../utils/validators/is-data-type");

describe("isDataType", () => {
  const rightDataToCheck = {};
  const wrongdDataToCheck = [];
  const dataType = "Object";

  describe("when successful", () => {
    it("returns true", () => {
      expect(isDataType(rightDataToCheck, dataType)).to.equal(true);
    });
  });

  describe("when unsuccessful", () => {
    it("returns false", () => {
      expect(isDataType(wrongdDataToCheck, dataType)).to.equal(false);
    });
  });
});

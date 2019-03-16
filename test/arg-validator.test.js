const { expect } = require("chai");
const validationGenerator = require("../commands/validations/arg-validator");

describe("argValidator", () => {
  const allowedArgs = ["arg1", "arg2", "arg3"];
  const expectedSuccessfulArg = "arg1";
  const command = "actions";
  const badArg = "badArg";
  const expectedErrorMessage =
    "actions action does not exist.\n   Here are the available actions -- [ arg1, arg2, arg3 ]";
  const validator = validationGenerator(command, allowedArgs);

  const withTryCatch = args => {
    try {
      const arg = validator(args);
      return arg;
    } catch (error) {
      return error;
    }
  };

  describe("when successful", () => {
    it("returns the given arg", () => {
      expect(withTryCatch(expectedSuccessfulArg)).to.equal(
        expectedSuccessfulArg
      );
    });
  });

  describe("when unsuccessful", () => {
    it("throws an error with command and expected array of args", () => {
      expect(withTryCatch(badArg))
        .to.be.an.instanceOf(Error)
        .with.property("message", expectedErrorMessage);
    });
  });
});

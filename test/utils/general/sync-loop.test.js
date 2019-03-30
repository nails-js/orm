const { expect } = require("chai");
const syncLoop = require("../../../utils/general/sync-loop");

// afterEach()
describe("sync-loop", () => {
  const orderedArray = [
    { id: 1, processed: false },
    { id: 2, processed: false },
    { id: 3, processed: false }
  ];
  const expectOrderedArray = [
    { id: 1, processed: true },
    { id: 2, processed: true },
    { id: 3, processed: true }
  ];

  const unorderedArray = [
    { id: 2, processed: false },
    { id: 3, processed: false },
    { id: 1, processed: false }
  ];
  const expectUnorderedArray = [
    { id: 2, processed: true },
    { id: 3, processed: true },
    { id: 1, processed: true }
  ];

  const asyncFunctionToRun = target => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...target, processed: true });
      }, Math.random(500));
    });
  };

  const functionToInvoke = async item => {
    const result = await asyncFunctionToRun(item);
    return result;
  };

  describe("when given an ordered array and function", () => {
    it("invokes functions synchronously", async () => {
      const finalResult = await syncLoop(orderedArray, functionToInvoke);

      expect(finalResult).to.eql(expectOrderedArray);
    });
  });

  describe("when given an unordered array and function", () => {
    it("invokes functions synchronously", async () => {
      const finalResult = await syncLoop(unorderedArray, functionToInvoke);

      expect(finalResult).to.eql(expectUnorderedArray);
    });
  });
});

const { expect } = require("chai");
const fs = require("fs");
const shelljs = require("shelljs");
const init = require("../../../../src/commands/init/single");

const testDir = `${process.cwd()}/test/test-directory`;
const rootPath = testDir;

const checkExists = path => {
  return fs.existsSync(`${rootPath}${path}`);
};

describe("commands: init", () => {
  const nailsrc = ".nailsrc.js";
  const migrationsDir = "/database/migrations";
  const modelsDir = "/database/models";
  const configFile = "/database/config.js";
  const indexFile = "/database/index.js";
  const expectedErrorCode = "init_already_run";

  const databases = [];
  before(done => {
    fs.mkdir(testDir, done);
  });

  after(() => {
    shelljs.rm("-rf", testDir);
  });

  describe("generates required files", async () => {
    before(done => {
      init({ rootPath, databases }).then(done);
    });

    it("creates ./.nailsrc", () => {
      const nailsRcExists = shelljs.ls("-A", rootPath).includes(nailsrc);
      expect(nailsRcExists).to.be.true;
    });

    it("creates ./database/migrations", () => {
      const migrationsDirExists = checkExists(migrationsDir);

      expect(migrationsDirExists).to.be.true;
    });

    it("creates ./database/models", () => {
      const modelsDirExists = checkExists(modelsDir);

      expect(modelsDirExists).to.be.true;
    });

    it("creates ./database/config.js", () => {
      const configFileExists = checkExists(configFile);

      expect(configFileExists).to.be.true;
    });

    it("creates ./database/config.js", () => {
      const indexFileExists = checkExists(indexFile);

      expect(indexFileExists).to.be.true;
    });
  });

  describe("when unsuccessful", () => {
    it("throws an error if project already initialized", async () => {
      return init({ rootPath, databases }).catch(err => {
        console.log(err.code);
        expect(err)
          .to.be.an.instanceOf(Error)
          .with.property("code", expectedErrorCode);
      });
    });
  });
});

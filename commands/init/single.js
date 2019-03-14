const fs = require("fs");
const { nailsrcConfig, dbConfig } = require("./templates");
const { CLIError } = require("../../src/error-handler");

const defaults = ["default", "sqlite", "localhost", "port", "user", "password"];

module.exports = async args => {
  const { rootPath, databases } = args;

  const parsed = databases[0] ? databases[0].split(":") : defaults;

  try {
    if (fs.existsSync(`${rootPath}/.nailsrc.js`)) {
      throw new CLIError("init_already_run");
    }

    const dbConfigTemplate = dbConfig(parsed);
    const nailsrcConfigTemplate = nailsrcConfig();

    await fs.mkdirSync(`${rootPath}/database/`);
    fs.mkdirSync(`${rootPath}/database/models`);
    fs.mkdirSync(`${rootPath}/database/migrations`);

    fs.writeFileSync(`${rootPath}/database/config.js`, dbConfigTemplate);

    fs.writeFileSync(`${rootPath}/.nailsrc.js`, nailsrcConfigTemplate);
  } catch (error) {
    console.error(error);
  }
};

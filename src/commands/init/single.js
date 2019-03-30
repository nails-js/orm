/* eslint-disable */

const fs = require("fs");
const { nailsrcConfig, dbConfig, index } = require("./templates");
const { CLIError } = require("../../error-handler");

const defaults = ["default", "sqlite", "localhost", "port", "user", "password"];

module.exports = args => {
  return new Promise(async (resolve, reject) => {
    const { rootPath, databases } = args;

    const parsed = databases[0] ? databases[0].split(":") : defaults;

    try {
      if (fs.existsSync(`${rootPath}/.nailsrc.js`)) {
        return reject(new CLIError("init_already_run"));
      }
      const dbConfigTemplate = dbConfig(parsed);
      const nailsrcConfigTemplate = nailsrcConfig();
      const indexTemplate = index(parsed[0]);

      await fs.mkdirSync(`${rootPath}/database/`);
      await fs.mkdirSync(`${rootPath}/database/models`);
      await fs.mkdirSync(`${rootPath}/database/migrations`);

      await fs.writeFileSync(
        `${rootPath}/database/config.js`,
        dbConfigTemplate
      );

      await fs.writeFileSync(`${rootPath}/.nailsrc.js`, nailsrcConfigTemplate);

      await fs.writeFileSync(`${rootPath}/database/index.js`, indexTemplate);

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

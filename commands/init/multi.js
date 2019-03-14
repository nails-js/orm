const fs = require("fs");
const { nailsrcConfig, dbConfig } = require("./templates");
const { CLIError } = require("../../src/error-handler");

module.exports = async args => {
  const { rootPath, databases } = args;

  try {
    if (fs.existsSync(`${rootPath}/.nailsrc.js`)) {
      throw new CLIError("init_already_run");
    }

    await fs.mkdirSync(`${rootPath}/database/`);

    databases.reduce(
      (promiseChain, database) =>
        promiseChain.then(async () => {
          const parsed = database.split(":");
          const dbName = parsed[0];

          const dbConfigTemplate = dbConfig(parsed);
          const nailsrcConfigTemplate = nailsrcConfig();

          await fs.mkdirSync(`${rootPath}/database/${dbName}`);
          fs.mkdirSync(`${rootPath}/database/${dbName}/models`);
          fs.mkdirSync(`${rootPath}/database/${dbName}/migrations`);

          fs.writeFileSync(
            `${rootPath}/database/${dbName}/config.js`,
            dbConfigTemplate
          );

          fs.writeFileSync(`${rootPath}/.nailsrc.js`, nailsrcConfigTemplate);
        }),
      Promise.resolve()
    );
  } catch (error) {
    console.error(error);
  }
};

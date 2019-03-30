const fs = require("fs");
const { validators, fileSystem } = require("../utils");
const adaptors = require("./adaptors");
const { ConnectionError } = require("./error-handler");

function ConnectionManager(state, handlers) {
  const { connections } = state;
  const { setState } = handlers;
  // PRIVATE METHODS
  const getAdaptor = config => {
    return validators.isDataType(config, "String")
      ? config.split(":")[0]
      : config.adaptor;
  };

  function initializeModels(dbConfig, modelPath) {
    return new Promise(resolve => {
      const models = {};
      fs.readdirSync(modelPath).forEach(file => {
        const model = require(`${modelPath}/${file}`);
        model.setConnection(dbConfig);
        models[model.name] = model;

        console.log(`${model.name} model initialized`);
      });

      resolve(models);
    });
  }

  return {
    connect(config) {
      return fileSystem.executeFromRoot("@nails/orm", async rootPath => {
        try {
          if (validators.isDataType(config, "Object")) {
            if (!config.adaptor) {
              throw new ConnectionError("config_error_adaptor");
            }
          }

          const adaptor = getAdaptor(config);

          if (!adaptors[adaptor]) {
            throw new ConnectionError("adaptor_not_supported");
          }

          const newConnection = await adaptors[adaptor].connect(
            config,
            rootPath
          );

          const models = await initializeModels(
            config,
            `${rootPath}/database/${config.database.split("-")[0]}/models`
          );

          const connectionWithModels = { connection: newConnection, models };

          setState("connections", {
            ...connections,
            [config.name]: connectionWithModels
          });

          console.log("Connected");

          return connectionWithModels;
        } catch (error) {
          console.error(error);
        }
      });
    }
  };
}

module.exports = ConnectionManager;

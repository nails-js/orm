const fs = require("fs");
const { isDataType, executeFromRoot } = require("@nails/utils");
const adaptors = require("./adaptors");
const { ConnectionError } = require("./error-handler");

function ConnectionManager(state, handlers) {
  const { connections } = state;
  const { setState } = handlers;
  // PRIVATE METHODS
  const getAdaptor = config => {
    return isDataType(config, "String") ? config.split(":")[0] : config.adaptor;
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
      return executeFromRoot("@nails/orm", async rootPath => {
        if (isDataType(config, "Object")) {
          if (!config.adaptor) {
            throw new ConnectionError("config_error_adaptor");
          }
        }

        const adaptor = getAdaptor(config);

        const newConnection = await adaptors[adaptor].connect(config, rootPath);

        const models = await initializeModels(
          config,
          `${rootPath}/database/bridj/models`
        );

        const connectionWithModels = { connection: newConnection, models };

        setState("connections", {
          ...connections,
          [config.name]: connectionWithModels
        });

        console.log("Connected");

        return connectionWithModels;
      });
    }
  };
}

module.exports = ConnectionManager;

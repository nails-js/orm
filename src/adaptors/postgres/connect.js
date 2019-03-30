const { validators } = require("../../../utils");
const { ConnectionError } = require("../../error-handler");

const connect = (CONFIG, rootPath) => {
  return new Promise(resolve => {
    let config = CONFIG;
    // eslint-disable-next-line
    const { parse } = require("pg-connection-string");

    // eslint-disable-next-line
    const { Pool, Client } = require(`${rootPath}/node_modules/pg`);

    if (validators.isDataType(config, "String")) {
      config = parse(config.connectionString);
    }

    const newConnection = config.pool ? new Pool(config) : new Client(config);

    newConnection.nawhalConfig = { ...config };
    newConnection.Query = newConnection.query;

    newConnection
      .connect()
      .then(() => {
        resolve({ connection: newConnection, dbName: config.database });
      })
      .catch(error => {
        throw new ConnectionError(error.code, config.database);
      });
  });
};

module.exports = connect;

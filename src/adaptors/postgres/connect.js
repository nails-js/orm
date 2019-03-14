const { isDataType } = require("@nails/utils");

const connect = (CONFIG, rootPath) => {
  return new Promise((resolve, reject) => {
    let config = CONFIG;
    // eslint-disable-next-line
    const { parse } = require("pg-connection-string");

    // eslint-disable-next-line
    const { Pool, Client } = require(`${rootPath}/node_modules/pg`);

    if (isDataType(config, "String")) {
      config = parse(config.connectionString);
    }

    const newConnection = config.pool ? new Pool(config) : new Client(config);

    newConnection.nawhalConfig = { ...config };
    newConnection.Query = newConnection.query;

    newConnection
      .connect()
      .then(() =>
        resolve({ connection: newConnection, dbName: config.database })
      )
      .catch(reject);
  });
};

module.exports = connect;

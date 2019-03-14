const colors = require("colors");

class ConnectionError extends Error {
  constructor(code, data) {
    super(code);
    this.name = `@nails/orm Connection Error`.red;
    this.message = "Connection Error";
    this.data = colors.yellow(data);

    if (code) {
      this.message = colors.white(this.checkCode(code, this.data));
    }

    Error.captureStackTrace(this, this.constructor);
  }

  static checkCode(code, data) {
    switch (code) {
      // postgresql codes
      case "3D000":
        return `The database, "${data}" you are trying to connect to does not exist. Create the database and then try again.\n`;

      case "config_error_adaptor":
        return `The config object you have use for creating a connection is incorrect. Please check that you have used the correct value for the adaptor attribute.`;

      default:
        return "Whelp... something went wrong but I'm not quite sure what it was...";
    }
  }
}

module.exports = ConnectionError;

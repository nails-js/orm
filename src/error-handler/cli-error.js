const colors = require("colors");

class CLIError extends Error {
  constructor(code, data) {
    super(code);
    this.name = `@nails/orm CLI Error`.red;
    this.message = "Connection Error";
    this.data = colors.yellow(data);
    this.code = code;

    if (code) {
      this.message = colors.white(CLIError.checkCode(code, this.data));
    }

    Error.captureStackTrace(this, this.constructor);
  }

  static checkCode(code, data) {
    switch (code) {
      // postgresql codes
      case "init_already_run":
        return "This directory has already been initialised with the Nails/Orm. If you are wanting to add a new database, run db:add or look at the docs - TODO: add doc link";

      default:
        return "Whelp... something went wrong but I'm not quite sure what it was...";
    }
  }
}

module.exports = CLIError;

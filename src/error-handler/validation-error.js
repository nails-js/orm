const util = require("util");
// const colors = require("colors");

class ValidationError extends Error {
  constructor(message, data) {
    super(message);
    this.name = `@nails/orm Validation Error`.red;
    this.message = "Validation Error";

    const dataString = data ? `=>${util.format(" ", data)}` : "";
    if (message) {
      this.message = `${message} ${dataString}\n`.white;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;

const colors = require("colors");

class ModelError extends Error {
  constructor(code, data) {
    super(code);
    this.name = `@nails/orm Model Error`.red;
    this.message = "Model Error";
    this.data = colors.yellow(data);

    if (code) {
      this.message = colors.white(this.checkCode(code, this.data));
    }

    Error.captureStackTrace(this, this.constructor);
  }

  static checkCode(code, data) {
    switch (code) {
      // postgresql codes
      case "DUPLICATE_MODEL":
        return `Duplicate model detected: ${data}`;

      case "MODEL_FIELDS_CHANGED":
        return `It appears as though you are trying to change the Model directly by the Model declaration object. To update the existing model please reference the documentation on using the "Model.migration method".`;
      default:
        return "Whelp... something went wrong but I'm not quite sure what it was...";
    }
  }
}

module.exports = ModelError;

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = `@nails/orm Base Error`.red;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;

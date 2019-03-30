const CREATE_TABLE = require("./create-table");

const types = {
  CREATE_TABLE
};
module.exports = (args, options) => {
  const type = args.type.toUpperCase();

  if (types[type]) types[type](args, options);
};

const multi = require("./multi");
const single = require("./single");

const options = {
  multi,
  single
};

module.exports = async (args, ops) => {
  const { option } = args;
  const mutatedArgs = { ...args, rootPath: process.cwd() };
  if (options[option]) options[option](mutatedArgs, ops);
};

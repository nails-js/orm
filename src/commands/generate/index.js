const migration = require("./migration");

const actions = {
  migration
};
module.exports = (args, options) => {
  const { action } = args;
  const mutatedArgs = { ...args, rootPath: process.cwd() };

  if (actions[action]) actions[action](mutatedArgs, options);
  if (!actions[action]) throw new Error("That generation action doesn't exist");
};

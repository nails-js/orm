#!/usr/bin/env node

const prog = require("caporal");

const commands = require("./src/commands");
const { argValidator } = require("./utils/validators");

prog
  .version("1.0.0")
  .command("init", "Initializes folder structure for nails/orm")
  .argument("<option>", "Options for the init command")
  .argument("[databases...]", "Databases being added if multi")
  .action(commands.init);

prog
  .version("1.0.0")
  .command("db", "")
  .argument("<action>", "")
  .argument("[options...]", "databases being added")
  .action(commands.db);

prog
  .version("1.0.0")
  .command("generate", "Generates files given correct action.")
  .argument(
    "<action>",
    "Specific generation action you want to run.",
    argValidator("generate action", ["migration"])
  )
  .option("--db <database>")
  .argument("<type>", "")
  .argument("<model>", "")
  .argument("[options...]", "databases being added")
  .action(commands.generate);

const [nodeBin, executable, command, ...rest] = process.argv;

if (command) {
  const [cmd, option = "single"] = command.split(":");
  prog.parse([nodeBin, executable, cmd, option, ...rest]);
}

const executeFromRoot = (pkgCondition, callback) => {
  const shell = require("shelljs");
  const fs = require("fs");

  let condition = true;
  while (condition) {
    const localPath = process.cwd();
    const pkgCheck = fs.existsSync(`${localPath}/package.json`);

    shell.cd("..");

    if (pkgCheck) {
      const pkg = require(`${localPath}/package.json`);

      const hasDevDependency =
        pkg.devDependencies && pkg.devDependencies[pkgCondition];

      const hasDependency = pkg.dependencies && pkg.dependencies[pkgCondition];

      if (hasDevDependency || hasDependency) {
        condition = false;
        return callback(localPath);
      }

      shell.cd("..");
    } else if (!pkgCheck) {
      if (localPath === "/") {
        condition = false;
        throw new Error("Must be inside a Nails project directory");
      }
    }
  }
  return null;
};

module.exports = executeFromRoot;

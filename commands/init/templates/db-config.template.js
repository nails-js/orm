const { objectToTemplate } = require("@nails/utils").formatters;

module.exports = database => {
  const shapiyfyDb = env => {
    const config = {
      name: `"${database[0] || "name"}-${env}"`,
      host: `"${database[2] || "localhost"}"`,
      port: `"${database[3] || "port"}"`,
      user: `"${database[4] || "user"}"`,
      password: `"${database[5] || "password"}"`
    };

    return objectToTemplate(config);
  };

  return `module.exports = {
  adaptor: "${database[1] || "sqlite"}",
  development: {${shapiyfyDb("development")}
  },
  development: {${shapiyfyDb("test")}
  },
  development: {${shapiyfyDb("production")}
  }
};
  `;
};

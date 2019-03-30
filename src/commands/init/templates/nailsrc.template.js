module.exports = () => {
  return `module.exports = {
  "@nails/orm": {
    multi: false,
    databases: {
      default: {
        migrationsPath: "<root>/database/migrations",
        modelsPath: "<root>/database/models"
      }
    }
  }
};
  `;
};

module.exports = database => `const nailsOrm = require("@nails/orm");
const dbConfig = require("./config");

const ${database}DB = nailsOrm.connect(dbConfig.development);

module.exports = ${database}DB;`;

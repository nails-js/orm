const isDataType = require("../validators/is-data-type");

const objectToTemplate = object => {
  let template = "";

  const keys = Object.keys(object);

  keys.forEach((key, index) => {
    template += `\n    ${key}: ${object[key]}${
      index !== keys.length - 1 ? "," : ""
    }`;
  });

  return template;
};

module.exports = objectToTemplate;

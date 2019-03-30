const isDataType = (dataToCheck, dataType) => {
  const stringified = Object.prototype.toString.call(dataToCheck);

  const passed = stringified === `[object ${dataType}]`;

  return passed;
};

module.exports = isDataType;

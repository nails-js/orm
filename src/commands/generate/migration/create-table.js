module.exports = (args, options) => {
  // console.log(args, options);
  if (options.db) {
    console.log("has db");
  } else {
    console.log("has no db");
  }
};

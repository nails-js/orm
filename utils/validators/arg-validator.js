const argValidator = (command, acceptedArgs) => arg => {
  if (acceptedArgs.includes(arg) === false) {
    throw new Error(
      `${command} action does not exist.\n   Here are the available actions -- [ ${acceptedArgs.join(
        ", "
      )} ]`
    );
  }

  return arg;
};

module.exports = argValidator;

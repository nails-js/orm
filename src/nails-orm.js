const Model = require("./model");
// const DATA_TYPES = require("./data-types");
const ConnectionManager = require("./connection-manager");

const nailsOrm = () => {
  const state = {
    // private methods

    // state
    isVerbose: false,
    connections: {},
    models: {},
    events: {},
    baseDir: null
  };

  // private methods

  function setState(key, value) {
    state[key] = value;
  }

  const handlers = { setState };

  return {
    ...state.connections,
    ...ConnectionManager(state, handlers),

    Model: constructor => {
      return Model(constructor, state, handlers);
    },

    verbose() {
      state.isVerbose = true;
    }
  };
};

module.exports = nailsOrm();

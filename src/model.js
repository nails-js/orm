function Model(constructor, { connections }) {
  const { name } = constructor;
  const state = { connection: null, adaptor: null };

  return {
    name,
    setConnection: dbConfig => {
      state.adaptor = dbConfig.adaptor;
      state.connection = connections[dbConfig.name];
      console.log(state.adaptor);
    }
  };
}

module.exports = Model;

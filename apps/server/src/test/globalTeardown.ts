module.exports = async function (globalConfig, projectConfig) {
  console.log('TearDown');
  await globalThis.__MONGOD__.stop();
};

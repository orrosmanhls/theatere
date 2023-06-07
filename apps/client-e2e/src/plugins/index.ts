// eslint-disable-next-line @typescript-eslint/no-var-requires
const cucumber = require('cypress-cucumber-preprocessor').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const browserify = require('@cypress/browserify-preprocessor');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on: (arg0: string, arg1: any) => void, config: any) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = {
    ...browserify.defaultOptions,
    typescript: require.resolve('typescript')
  };
  on('file:preprocessor', cucumber(options));
};

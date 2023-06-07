import { defineConfig } from 'cypress';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default defineConfig({
  e2e: {
    projectId: '6zutor',
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    supportFile: './src/support/index.ts',
    video: true,
    videosFolder: '../../dist/cypress/apps/client-e2e/videos',
    screenshotsFolder: '../../dist/cypress/apps/client-e2e/screenshots',
    chromeWebSecurity: false,
    specPattern: '**/*.feature',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('./src/plugins/index.ts')(on, config);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('cypress-localstorage-commands/plugin')(on, config);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // require("aws-amplify")(on, config);
      return config;
    },
    env: {
      cognito_username: process.env.AWS_COGNITO_USERNAME,
      cognito_password: process.env.AWS_COGNITO_PASSWORD,
      awsConfig: {
        Auth: {
          region: process.env.NX_APP_AWS_REGION,
          userPoolId: process.env.NX_APP_AWS_POOL_ID,
          userPoolWebClientId: process.env.NX_APP_AWS_WEB_CLIENT_ID
        }
      }
    }
  }
});

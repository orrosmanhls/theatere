import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { join } from 'path';
import * as fs from 'fs';

module.exports = async function (globalConfig, projectConfig) {
  console.log('globalSetup');
  // Config to decided if an mongodb-memory-server instance should be used
  // it's needed in global space, because we don't want to create a new instance every test-suite
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();

  // Set reference to mongod in order to close the server during teardown.
  globalThis.__MONGOD__ = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  createConfigFile(uri);
  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};

const createConfigFile = (uri: string) => {
  const cwd = process.cwd();
  const globalConfigPath = join(cwd, 'globalConfig.json');

  const mongoConfig = { mongoUri: '' };
  mongoConfig.mongoUri = uri;
  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
};

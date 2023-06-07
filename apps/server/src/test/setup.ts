import { AppModules } from '../app/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuardMock } from '../guards/cognito-auth-mock.guard';

export let appTest: INestApplication;
export let TestingAppModule: TestingModule;

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env['MONGO_URI']);
});

beforeEach(async () => {
  const uri = `${process.env['MONGO_URI']}/${new mongoose.Types.ObjectId().toString()}`;
  TestingAppModule = await Test.createTestingModule({
    imports: [MongooseModule.forRoot(uri), ...AppModules],
    providers: [{ provide: APP_GUARD, useClass: CognitoAuthGuardMock }, CognitoAuthGuardMock]
  }).compile();

  appTest = TestingAppModule.createNestApplication();

  appTest.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // appTest.useGlobalFilters(new AllExceptionsFilter());
  appTest.use(cookieParser());
  useContainer(appTest, { fallbackOnErrors: true });

  await appTest.init();

  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(uri);
    } finally {
      await mongoose.connection.db.dropDatabase();
    }
  } else {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  appTest.close();
  await mongoose.disconnect();
});

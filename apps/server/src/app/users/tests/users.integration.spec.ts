import { UsersFactory } from './users.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from '../users.schema';
import { DocumentStatus } from '@node-monorepo/types';
import { UsersEntity } from '../entities/users.entity';

describe('users e2e testing', () => {
  let usersModel: Model<UsersDocument>;

  beforeEach(async () => {
    usersModel = TestingAppModule.get<Model<UsersDocument>>(getModelToken(Users.name));
  });

  it('should get users by search params', async () => {
    //arrange data
    await usersModel.insertMany(UsersFactory.buildList(100));
    const firstName = 'Marco Polo';
    await usersModel.create(UsersFactory.build({ firstName }));
    return request(appTest.getHttpServer())
      .post('/users/search')
      .send({
        search: firstName
      })
      .expect(200)
      .then((response) => {
        const result: UsersEntity[] = response.body;
        expect(result.length).toBe(1);
        expect(result[0].firstName).toEqual(firstName);
      });
  });
  it('should get all', async () => {
    //arrange data
    await usersModel.insertMany(UsersFactory.buildList(4));

    return request(appTest.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
      });
  });

  it('should create user', async () => {
    const users = UsersFactory.build();
    await request(appTest.getHttpServer()).post('/users').send(users).expect(201);
    const usersFromDb = await usersModel.find({ address: users.address }).lean().exec();
    expect(usersFromDb[0]).toHaveProperty('address', users.address);
  });

  it('should get users by id', async () => {
    const usersId = new Types.ObjectId();
    const users = UsersFactory.build({ _id: usersId });
    await usersModel.create(users);

    await request(appTest.getHttpServer())
      .get(`/users/${usersId}`)
      .expect(200)
      // deepcode ignore PromiseNotCaughtGeneral/test: <please specify a reason of ignoring this>
      .then((response) => {
        expect(response.body._id).toEqual(usersId.toString());
      });
  });

  it('should delete users', async () => {
    const usersId = new Types.ObjectId();
    const users = UsersFactory.build({ _id: usersId });
    await usersModel.create(users);

    await request(appTest.getHttpServer())
      .delete(`/users/${usersId}`)
      .expect(200)
      // deepcode ignore PromiseNotCaughtGeneral/test: <please specify a reason of ignoring this>
      .then(async () => {
        const deletedUser = await usersModel.findById(usersId).lean().exec();
        expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
      });
  });
});

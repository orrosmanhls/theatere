import { ActorFactory } from './actor.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Actor, ActorDocument } from '../actor.schema';
import { DocumentStatus, IActor } from '@node-monorepo/types';
import { ActorEntity } from '../entities/actor.entity';

describe('actor e2e testing', () => {
  let actorModel: Model<ActorDocument>;

  beforeEach(async () => {
    actorModel = TestingAppModule.get<Model<ActorDocument>>(getModelToken(Actor.name));
  });
  it('should get actor by search params', async () => {
    //arrange data
    await actorModel.insertMany(ActorFactory.buildList(100));
    return request(appTest.getHttpServer())
      .post('/actor/search')
      .send({
        limit: 5
      })
      .expect(200)
      .then((response) => {
        const result: ActorEntity[] = response.body;
        expect(result.length).toBe(5);
      });
  });

  it('should get actors by name search', async () => {
    const firstName = 'aabbcc';
    await actorModel.insertMany(ActorFactory.buildList(10, { firstName }));
    await actorModel.insertMany(ActorFactory.buildList(10, { firstName: 'ddeeff' }));

    return request(appTest.getHttpServer())
      .post('/actor/search')
      .send({
        search: firstName
      })
      .expect(200)
      .then((response) => {
        const result: IActor[] = response.body;
        expect(result.length).toBe(10);
        result.forEach((actor) => {
          expect(actor.firstName).toBe(firstName);
        });
      });
  });

  it('should get all', async () => {
    //arrange data
    await actorModel.insertMany(ActorFactory.buildList(4));

    return request(appTest.getHttpServer())
      .get('/actor')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
      });
  });
  it('should create one', async () => {
    const actor = ActorFactory.build({ firstName: 'bfgrtd' });
    await request(appTest.getHttpServer()).post('/actor').send(actor).expect(201);
    const actorFromDb = await actorModel.find({ firstName: 'bfgrtd' }).lean().exec();
    expect(actorFromDb.length).toBe(1);
  });

  it('should fail to create actor (age exceeds limits)', async () => {
    const actor = ActorFactory.build({ age: 200 });
    await request(appTest.getHttpServer()).post('/actor').send(actor).expect(400);
  });

  it('should get actor by id', async () => {
    const actorId = new Types.ObjectId();
    const actor = ActorFactory.build({ _id: actorId });
    await actorModel.create(actor);

    await request(appTest.getHttpServer())
      .get(`/actor/${actorId}`)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(actorId.toString());
      });
  });

  it('should delete actor', async () => {
    const actorId = new Types.ObjectId();
    const actor = ActorFactory.build({ _id: actorId });
    await actorModel.create(actor);

    const response = await request(appTest.getHttpServer()).delete(`/actor/${actorId}`).expect(200);

    const deletedUser = await actorModel.findById(actorId).lean().exec();
    expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
  });

  it('should update actor', async () => {
    const actor = ActorFactory.build({ age: 50 });
    const actorFromDb = await actorModel.create(actor);
    const updateDetails = {
      firstName: 'aabbcc',
      lastName: 'ddeeff',
      age: 100
    };

    await request(appTest.getHttpServer())
      .put(`/actor/${actorFromDb._id}`)
      .send(updateDetails)
      .expect(200);
    const updatedActor = await actorModel.findById(actorFromDb._id);
    console.log(updatedActor);
    expect(updatedActor.firstName).toBe(updateDetails.firstName);
    expect(updatedActor.lastName).toBe(updateDetails.lastName);
    expect(updatedActor.age).toBe(updateDetails.age);
  });
});

import { ActorFactory } from './actor.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Actor, ActorDocument } from '../actor.schema';
import { DocumentStatus } from '@node-monorepo/types';
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
    const actor = ActorFactory.build({});
    await request(appTest.getHttpServer()).post('/actor').send(actor).expect(201);
    const actorFromDb = await actorModel.find({}).lean().exec();
    expect(actorFromDb.length).toBe(1);
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

    await request(appTest.getHttpServer())
      .delete(`/actor/${actorId}`)
      .expect(200)
      .then(async (_) => {
        const deletedUser = await actorModel.findById(actorId).lean().exec();
        expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
      });
  });
});

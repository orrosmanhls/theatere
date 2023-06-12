import { ShowFactory } from './show.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Show, ShowDocument } from '../show.schema';
import { DocumentStatus } from '@node-monorepo/types';
import { ShowEntity } from '../entities/show.entity';

describe('show e2e testing', () => {
  let showModel: Model<ShowDocument>;

  beforeEach(async () => {
    showModel = TestingAppModule.get<Model<ShowDocument>>(getModelToken(Show.name));
  });
  it('should get show by search params', async () => {
    //arrange data
    await showModel.insertMany(ShowFactory.buildList(100));
    return request(appTest.getHttpServer())
      .post('/show/search')
      .send({
        limit: 5
      })
      .expect(200)
      .then((response) => {
        const result: ShowEntity[] = response.body;
        expect(result.length).toBe(5);
      });
  });

  it('should get all', async () => {
    //arrange data
    await showModel.insertMany(ShowFactory.buildList(4));

    return request(appTest.getHttpServer())
      .get('/show')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
      });
  });
  it('should create one', async () => {
    const show = ShowFactory.build({});
    await request(appTest.getHttpServer()).post('/show').send(show).expect(201);
    const showFromDb = await showModel.find({}).lean().exec();
    expect(showFromDb.length).toBe(1);
  });

  it('should get show by id', async () => {
    const showId = new Types.ObjectId();
    const show = ShowFactory.build({ _id: showId });
    await showModel.create(show);

    await request(appTest.getHttpServer())
      .get(`/show/${showId}`)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toEqual(showId.toString());
      });
  });

  it('should delete show', async () => {
    const showId = new Types.ObjectId();
    const show = ShowFactory.build({ _id: showId });
    await showModel.create(show);

    await request(appTest.getHttpServer())
      .delete(`/show/${showId}`)
      .expect(200)
      .then(async (_) => {
        const deletedUser = await showModel.findById(showId).lean().exec();
        expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
      });
  });
});

import { ShowFactory } from './show.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Show, ShowDocument } from '../show.schema';
import { DocumentStatus, IShow } from '@node-monorepo/types';
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

  it('should get shows by search', async () => {
    const hallToCheck = 'rubina';
    await showModel.insertMany(ShowFactory.buildList(8, { hall: hallToCheck }));
    await showModel.insertMany(ShowFactory.buildList(12, { hall: 'bartonov' }));

    const response = await request(appTest.getHttpServer())
      .post('/show/search')
      .send({ search: hallToCheck })
      .expect(200);

    expect(response.body.length).toBe(8);
    response.body.forEach((show) => {
      expect(show.hall).toBe(hallToCheck);
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
    const show = ShowFactory.build();
    await request(appTest.getHttpServer()).post('/show').send(show).expect(201);
    const showFromDb = await showModel.find({ hall: show.hall }).lean().exec();
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

    await request(appTest.getHttpServer()).delete(`/show/${showId}`).expect(200);

    const deletedUser = await showModel.findById(showId).lean().exec();
    expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
  });

  it('should purchase tickets to show', async () => {
    const show = await showModel.create(ShowFactory.build());
    const amount = 10;

    await request(appTest.getHttpServer())
      .put(`/show/${show.id}/purchase`)
      .send({ amount })
      .expect(200);

    const showFromDb: IShow = await showModel.findById(show.id).lean().exec();
    expect(showFromDb.availableSeats).toBe(show.availableSeats - amount);
  });

  it('should fail to purchase by exceeded amount', async () => {
    const show = await showModel.create(ShowFactory.build());
    const amount = show.availableSeats + 1;

    await request(appTest.getHttpServer())
      .put(`/show/${show.id}/purchase`)
      .send({ amount })
      .expect(400);

    const showFromDb: IShow = await showModel.findById(show.id).lean().exec();
    expect(showFromDb.availableSeats).toBe(show.availableSeats);
  });

  it('should fail to purchase by bad id', async () => {
    const notFoundId = new Types.ObjectId();
    await showModel.create(ShowFactory.build());

    await request(appTest.getHttpServer())
      .put(`/show/${notFoundId}/purchase`)
      .send({ amount: 5 })
      .expect(404);
  });

  it('should cancel tickets to show', async () => {
    const showBuild = ShowFactory.build({ seats: 50 });
    showBuild.availableSeats = 40;
    const show = await showModel.create(showBuild);
    const amount = 10;

    await request(appTest.getHttpServer())
      .put(`/show/${show.id}/cancel`)
      .send({ amount })
      .expect(200);

    const showFromDb: IShow = await showModel.findById(show.id).lean().exec();
    expect(show.availableSeats + 10).toBe(showFromDb.availableSeats);
  });

  it('should fail to cancel by exceeded amount', async () => {
    const showBuild = ShowFactory.build({ seats: 50 });
    showBuild.availableSeats = 40;
    const show = await showModel.create(showBuild);
    const amount = 11;

    await request(appTest.getHttpServer())
      .put(`/show/${show.id}/cancel`)
      .send({ amount })
      .expect(400);

    const showFromDb: IShow = await showModel.findById(show.id).lean().exec();
    expect(show.availableSeats).toBe(showFromDb.availableSeats);
  });

  it('should fail to cancel by bad id', async () => {
    const notFoundId = new Types.ObjectId();
    await showModel.create(ShowFactory.build());

    await request(appTest.getHttpServer())
      .put(`/show/${notFoundId}/cancel`)
      .send({ amount: 5 })
      .expect(404);
  });
});

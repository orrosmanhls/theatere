import { CreatePlayDtoFactory, PlaysFactory } from './plays.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Plays, PlaysDocument } from '../plays.schema';
import { Genres, DocumentStatus } from '@node-monorepo/types';

describe('plays e2e testing', () => {
  let playsModel: Model<PlaysDocument>;

  beforeEach(async () => {
    playsModel = TestingAppModule.get<Model<PlaysDocument>>(getModelToken(Plays.name));
  });

  it('should get all', async () => {
    await playsModel.insertMany(PlaysFactory.buildList(4));

    return request(appTest.getHttpServer())
      .get('/plays')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
      });
  });

  it('should get play by id', async () => {
    const playID = new Types.ObjectId();
    const play = PlaysFactory.build({ _id: playID });
    await playsModel.create(play);

    await request(appTest.getHttpServer())
      .get(`/plays/${playID}`)
      .expect(200)
      .then((response) => expect(response.body._id).toEqual(playID.toString()));
  });

  it('should delete play by id', async () => {
    const playID = new Types.ObjectId();
    const play = PlaysFactory.build({ _id: playID });
    await playsModel.create(play);

    await request(appTest.getHttpServer())
      .delete(`/plays/${playID}`)
      .expect(200)
      .then(async () => {
        const deletedPlay = await playsModel.findById(playID).lean().exec();
        expect(deletedPlay.status).toEqual(DocumentStatus.DELETED);
      });
  });

  it('should create play', async () => {
    const playToCreate = CreatePlayDtoFactory.build();
    await request(appTest.getHttpServer()).post('/plays').send(playToCreate).expect(201);
    const playFromDb = await playsModel.find({ name: playToCreate.name }).lean().exec();
    expect(playFromDb[0]).toHaveProperty('name', playToCreate.name);
  });

  it('should get plays by search', async () => {
    await playsModel.insertMany(PlaysFactory.buildList(30));
    const playName = 'play name';
    await playsModel.create(PlaysFactory.build({ name: playName }));

    return request(appTest.getHttpServer())
      .post('/plays/search')
      .send({ search: playName })
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(1);
        expect(result[0].name).toEqual(playName);
      });
  });

  it('should get plays by filter', async () => {
    const comedyPlays = PlaysFactory.buildList(8, { genre: Genres.COMEDY });
    await playsModel.insertMany(comedyPlays);

    const dramaPlays = PlaysFactory.buildList(10, { genre: Genres.DRAMA });
    await playsModel.insertMany(dramaPlays);

    return request(appTest.getHttpServer())
      .post('/plays/search')
      .send({ filter: { genre: [Genres.COMEDY] } })
      .expect(201)
      .then((response) => {
        const result = response.body;
        expect(result.length).toBe(8);
        result.forEach((play) => {
          expect(play.genre).toBe(Genres.COMEDY);
        });
      });
  });

  it('should fail to create play by invalid genre', async () => {
    const playToCreate = CreatePlayDtoFactory.build();
    const invalidGenre = 'not Genres enum';

    await request(appTest.getHttpServer())
      .post('/plays/')
      .send({ ...playToCreate, genre: invalidGenre })
      .expect(400);

    const dbResponse = await playsModel.find({ name: playToCreate.name, genre: invalidGenre });
    expect(dbResponse.length).toBe(0);
  });

  it('should update play name and genre', async () => {
    const play = PlaysFactory.build({ genre: Genres.DRAMA });
    const playFromDb = await playsModel.create(play);
    const updateData = { name: 'update', genre: Genres.COMEDY };

    await request(appTest.getHttpServer())
      .put(`/plays/${playFromDb._id}`)
      .send(updateData)
      .expect(200);

    const updatedPlay = await playsModel.findById(playFromDb._id).lean();
    expect(updatedPlay.name).toBe(updateData.name);
    expect(updatedPlay.genre).toBe(updateData.genre);
  });
});

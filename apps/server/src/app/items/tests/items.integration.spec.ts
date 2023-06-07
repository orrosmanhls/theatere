import { ItemsFactory } from './items.factory';
import { appTest, TestingAppModule } from '../../../test/setup';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Items, ItemsDocument } from '../items.schema';
import { DocumentStatus } from '@node-monorepo/types';
import { ItemsEntity } from '../entities/items.entity';

describe('items e2e testing', () => {
  let itemsModel: Model<ItemsDocument>;

  beforeEach(async () => {
    itemsModel = TestingAppModule.get<Model<ItemsDocument>>(getModelToken(Items.name));
  });
  it('should get items by search params', async () => {
    //arrange data
    await itemsModel.insertMany(ItemsFactory.buildList(100));
    return request(appTest.getHttpServer())
      .post('/items/search')
      .send({
        limit: 5
      })
      .expect(200)
      .then((response) => {
        const result: ItemsEntity[] = response.body;
        expect(result.length).toBe(5);
      });
  });

  it('should get all', async () => {
    //arrange data
    await itemsModel.insertMany(ItemsFactory.buildList(4));

    return request(appTest.getHttpServer())
      .get('/items')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
      });
  });
  it('should create one', async () => {
    const items = ItemsFactory.build();
    await request(appTest.getHttpServer()).post('/items').send(items).expect(201);
    const itemsFromDb = await itemsModel.find({}).lean().exec();
    expect(itemsFromDb.length).toBe(1);
  });

  it('should get items by id', async () => {
    const itemsId = new Types.ObjectId();
    const items = ItemsFactory.build({ _id: itemsId });
    await itemsModel.create(items);

    await request(appTest.getHttpServer())
      .get(`/items/${itemsId}`)
      .expect(200)
      // file deepcode ignore PromiseNotCaughtGeneral/test: <please specify a reason of ignoring this>
      .then((response) => {
        expect(response.body._id).toEqual(itemsId.toString());
      });
  });

  it('should delete items', async () => {
    const itemsId = new Types.ObjectId();
    const items = ItemsFactory.build({ _id: itemsId });
    await itemsModel.create(items);

    await request(appTest.getHttpServer())
      .delete(`/items/${itemsId}`)
      .expect(200)
      .then(async (_) => {
        const deletedUser = await itemsModel.findById(itemsId).lean().exec();
        expect(deletedUser.status).toEqual(DocumentStatus.DELETED);
      });
  });
});

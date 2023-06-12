import { Test, TestingModule } from '@nestjs/testing';
import { ActorEntity } from '../entities/actor.entity';
import { ActorController } from '../actor.controller';
import { ActorService } from '../actor.service';
import { ActorFactory } from './actor.factory';

describe('ActorController', () => {
  let actorController: ActorController;
  const paramId = '1';
  const actorData = ActorFactory.build({ _id: paramId });

  const mockActorService = {
    update: jest.fn(async () => {
      return ActorEntity;
    }),
    delete: jest.fn(async () => {
      return ActorEntity;
    }),
    findOne: jest.fn(async () => {
      return ActorEntity;
    }),
    create: jest.fn(async () => {
      return ActorEntity;
    }),
    findAll: jest.fn(async () => {
      return [ActorEntity];
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ActorController],
      providers: [ActorService]
    })
      .overrideProvider(ActorService)
      .useValue(mockActorService)
      .compile();

    actorController = module.get<ActorController>(ActorController);
  });
  it('should be defined', () => {
    expect(actorController).toBeDefined();
  });

  it('should get all', async () => {
    expect(await actorController.findAll()).toEqual([ActorEntity]);
  });
  it('should create one', async () => {
    expect(await actorController.create(actorData)).toEqual(ActorEntity);
  });
  it('should update user', async () => {
    expect(await actorController.update(paramId, actorData)).toEqual(ActorEntity);
  });
  it('should get user by id', async () => {
    expect(await actorController.findOne(paramId)).toEqual(ActorEntity);
  });
  it('should delete user', async () => {
    expect(await actorController.delete(paramId)).toEqual(ActorEntity);
  });
});

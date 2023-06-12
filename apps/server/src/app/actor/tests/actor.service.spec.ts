/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActorService } from '../actor.service';
import { Actor } from '../actor.schema';
import { ActorFactory } from './actor.factory';

describe('ActorService', () => {
  let service: ActorService;
  let model: Model<Actor>;

  const actorData = ActorFactory.build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getModelToken('Actor'),
          useValue: {
            new: jest.fn().mockResolvedValue(actorData),
            constructor: jest.fn().mockResolvedValue(actorData),
            findOne: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            updateMany: jest.fn(),
            aggregate: jest.fn(),
            schema: jest.fn(),
            path: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ActorService>(ActorService);
    model = module.get<Model<Actor>>(getModelToken('Actor'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all actors', async () => {
    jest.spyOn(model, 'find').mockReturnValue([actorData] as any);
    const allActor = await service.findAll();
    expect(allActor).toEqual([actorData]);
  });

  it('should find actor by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue(actorData as any);
    const actor = await service.findOne('sdfsdfsdfsdf');
    expect(actor).toEqual(actorData);
  });
  it('should delete actor by id', async () => {
    jest.spyOn(model, 'updateOne').mockReturnValue(actorData as any);
    jest.spyOn(model, 'findById').mockReturnValue(actorData as any);
    const actor = await service.delete('sdfsdfsd');
    expect(actor).toEqual(actorData);
    return;
  });
});

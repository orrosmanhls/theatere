import { DocumentStatus, IShow } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

export const ShowFactory = Factory.define<IShow>(() => ({
  playId: new Types.ObjectId(),
  actors: Array.from({ length: 2 }, () => new Types.ObjectId()),
  hall: faker.random.word(),
  date: faker.date.recent(),
  seats: +faker.random.numeric(),
  status: DocumentStatus.ACTIVE
}));

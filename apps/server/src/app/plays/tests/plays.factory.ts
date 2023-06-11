import { Genres, DocumentStatus, IPlay } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { CreatePlayDto } from '../dto/create-play.dto';

export const PlaysFactory = Factory.define<IPlay>(() => ({
  name: faker.random.word(),
  genre: faker.helpers.arrayElement(Object.values(Genres)),
  status: DocumentStatus.ACTIVE
}));

export const CreatePlayDtoFactory = Factory.define<CreatePlayDto>(() => ({
  name: faker.random.word(),
  genre: faker.helpers.arrayElement(Object.values(Genres))
}));

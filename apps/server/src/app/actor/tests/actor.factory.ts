import { DocumentStatus, IActor } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const ActorFactory = Factory.define<IActor>(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: Math.floor(Math.random() * 150) + 1,
  status: DocumentStatus.ACTIVE
}));

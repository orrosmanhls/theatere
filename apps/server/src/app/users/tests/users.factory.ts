import { DocumentStatus, IUser, UserRole } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const UsersFactory = Factory.define<IUser>(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password(6),
  address: faker.address.streetAddress(),
  email: faker.internet.email(),
  role: UserRole.ADMIN,
  status: DocumentStatus.ACTIVE
}));

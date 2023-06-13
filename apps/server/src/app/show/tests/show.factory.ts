import { DocumentStatus, IShow } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

type ShowTransientParams = {
  actorsAmount: number;
};

const halls = ['rubina', 'muskin', 'bartonov'];

export const ShowFactory = Factory.define<IShow, ShowTransientParams>(({ transientParams }) => {
  const { actorsAmount } = transientParams;

  const user = {
    playId: new Types.ObjectId(),
    actors: Array.from(
      { length: actorsAmount ?? Math.floor(Math.random() * 10) + 1 },
      () => new Types.ObjectId()
    ),
    hall: faker.helpers.arrayElement(halls),
    date: faker.date.recent(),
    seats: +faker.random.numeric(2),
    availableSeats: 0,
    status: DocumentStatus.ACTIVE
  };
  user.availableSeats = user.seats;
  return user;
});

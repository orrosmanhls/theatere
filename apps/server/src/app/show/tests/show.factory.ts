import { DocumentStatus, IShow } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const ShowFactory = Factory.define<IShow>(() => ({
  status: DocumentStatus.ACTIVE
}));

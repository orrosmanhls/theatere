import { DocumentStatus, IItems } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const ItemsFactory = Factory.define<IItems>(() => ({
  status: DocumentStatus.ACTIVE
}));

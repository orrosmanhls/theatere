import { DocumentStatus, IActor } from '@node-monorepo/types';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const ActorFactory = Factory.define<IActor>(() => ({
  status: DocumentStatus.ACTIVE
}));

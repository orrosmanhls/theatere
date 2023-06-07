import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder as CaslAbilityBuilder,
  ExtractSubjectType,
  InferSubjects
} from '@casl/ability';

import { Action, IUser } from '@node-monorepo/types';
import { CaslService } from './casl.service';
import { Users } from '../users/users.schema';

export type Subjects = InferSubjects<typeof Users> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export type AbilityBuilder = CaslAbilityBuilder<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly caslService?: CaslService) {}
  createForUser(user: IUser) {
    const abilityBuilder = this.caslService.defineRulesFor(user);
    return abilityBuilder.build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}

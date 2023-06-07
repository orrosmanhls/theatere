import { Ability, AbilityBuilder as CaslAbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action, IUser, UserRole } from '@node-monorepo/types';
import { AbilityBuilder, AppAbility } from './casl-ability.factory';

@Injectable()
export class CaslService {
  getAbilityBuilder(): AbilityBuilder {
    return new CaslAbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>);
  }

  defineRulesFor(user: IUser) {
    const abilityBuilder = this.getAbilityBuilder();
    switch (user.role) {
      case UserRole.ADMIN:
        this.defineRulesForAdmin(abilityBuilder);
        break;

      default:
        break;
    }
    return abilityBuilder;
  }

  defineRulesForAdmin(abilityBuilder: AbilityBuilder) {
    const { can } = abilityBuilder;
    can(Action.MANAGE, 'all');
  }
}

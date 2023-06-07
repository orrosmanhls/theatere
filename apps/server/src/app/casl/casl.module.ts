import { AbilityBuilder } from '@casl/ability';
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslService } from './casl.service';

@Module({
  imports: [AbilityBuilder],
  providers: [CaslAbilityFactory, CaslService],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}

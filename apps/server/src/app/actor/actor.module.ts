import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActorController } from './actor.controller';
import { Actor, ActorSchema } from './actor.schema';
import { ActorService } from './actor.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])],
  controllers: [ActorController],
  providers: [ActorService]
})
export class ActorModule {}

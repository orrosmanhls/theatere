import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlaysController } from './plays.controller';
import { Plays, PlaysSchema } from './plays.schema';
import { PlaysService } from './plays.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Plays.name, schema: PlaysSchema }])],
  controllers: [PlaysController],
  providers: [PlaysService]
})
export class PlaysModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShowController } from './show.controller';
import { Show, ShowSchema } from './show.schema';
import { ShowService } from './show.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Show.name, schema: ShowSchema }])],
  controllers: [ShowController],
  providers: [ShowService]
})
export class ShowModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { Items, ItemsSchema } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}

import { PartialType } from '@nestjs/swagger';
import { CreateItemsDto } from './create-items.dto';

export class UpdateItemsDto extends PartialType(CreateItemsDto) {}

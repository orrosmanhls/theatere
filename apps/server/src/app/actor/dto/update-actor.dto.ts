import { PartialType } from '@nestjs/swagger';
import { CreateActorDto } from './create-actor.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActorDto extends PartialType(CreateActorDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}

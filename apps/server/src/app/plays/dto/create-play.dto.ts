import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genres } from '@node-monorepo/types';

export class CreatePlayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Genres)
  genre: Genres;
}

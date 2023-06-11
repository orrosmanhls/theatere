import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Genres } from '@node-monorepo/types';

export class UpdatePlayDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(Genres)
  genre: Genres;
}

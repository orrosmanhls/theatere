import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Genres } from 'libs/types/src/lib/plays/plays.enum';

export class UpdatePlayDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(Genres)
  genre: Genres;
}

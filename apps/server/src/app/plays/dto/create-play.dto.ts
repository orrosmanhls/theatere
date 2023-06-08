import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genres } from 'libs/types/src/lib/plays/plays.enum';

export class CreatePlayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Genres)
  genre: Genres;
}

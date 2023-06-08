import { IsString } from 'class-validator';

export class CreatePlayDto {
  @IsString()
  name: string;

  @IsString()
  genre: string;
}

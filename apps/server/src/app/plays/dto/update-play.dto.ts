import { IsOptional, IsString } from 'class-validator';

export class UpdatePlayDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  genre: string;
}

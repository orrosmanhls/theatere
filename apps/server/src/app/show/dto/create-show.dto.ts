import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty()
  playId: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  actors: ObjectId[];

  @IsString()
  @IsNotEmpty()
  hall: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  @Min(1)
  seats: number;
}

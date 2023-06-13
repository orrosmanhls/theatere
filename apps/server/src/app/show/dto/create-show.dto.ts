import { IsArray, IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty()
  playId: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  actors: ObjectId[];

  @IsIn(['rubina', 'muskin', 'bartonov'])
  hall: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  availableSeats: number;
}

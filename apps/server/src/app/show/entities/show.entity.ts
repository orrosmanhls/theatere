import { ApiProperty } from '@nestjs/swagger';
import { DocumentStatus } from '@node-monorepo/types';
import { ObjectId } from 'mongoose';

export class ShowEntity {
  @ApiProperty({
    description: 'ID of the play',
    example: '6486e07b48ff2c3c5d0ac1b9'
  })
  playId: ObjectId;

  @ApiProperty({
    description: 'List of actors IDs',
    example: ['6486e07b48ff2c3c5d0ac1b9', '6486e07b48ff2c3c5d0ac1b9']
  })
  actors: ObjectId[];

  @ApiProperty({
    description: 'Hall name',
    example: 'Rubina'
  })
  hall: string;

  @ApiProperty({
    description: 'Date of the play',
    example: '2023-06-12T09:08:11.692Z'
  })
  date: Date;

  @ApiProperty({
    description: 'Number of seats',
    example: 100
  })
  seats: number;

  @ApiProperty({
    description: '',
    example: ''
  })
  status: DocumentStatus;
}

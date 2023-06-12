import { ApiProperty } from '@nestjs/swagger';
import { DocumentStatus } from '@node-monorepo/types';
import { ObjectId } from 'mongoose';
export class ActorEntity {
  @ApiProperty({
    description: 'id of actor document',
    example: '6486e07b48ff2c3c5d0ac1b9'
  })
  _id: ObjectId;

  @ApiProperty({
    description: "actor's first name",
    example: 'Eli'
  })
  firstName: string;

  @ApiProperty({
    description: "actor's last name",
    example: 'Gorenstein'
  })
  lastName: string;

  @ApiProperty({
    description: 'age of actor',
    example: 34
  })
  age?: number;

  @ApiProperty({
    description: 'status of document: ACTIVE | DELETED',
    example: 1
  })
  status: DocumentStatus;

  @ApiProperty({
    description: 'document creation timestamp',
    example: '2023-06-12T09:08:11.692Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'document last update timestamp',
    example: '2023-06-12T09:08:11.692Z'
  })
  updatedAt: string;
}

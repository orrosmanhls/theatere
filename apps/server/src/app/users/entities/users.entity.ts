import { ApiProperty } from '@nestjs/swagger';

export class UsersEntity {
  @ApiProperty({
    description: 'user first name',
    example: 'John'
  })
  firstName: string;

  @ApiProperty({
    description: 'user last name',
    example: 'Doe'
  })
  lastName: string;

  @ApiProperty({
    description: 'user address',
    example: 'Spain, Barcelona'
  })
  address?: string;

  @ApiProperty({
    description: 'user password',
    example: 'fOdpErh#4j$pp'
  })
  password?: string;

  @ApiProperty({
    description: 'user email',
    example: 'johond@gmail.com'
  })
  email?: string;
}

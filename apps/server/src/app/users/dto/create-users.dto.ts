import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUsersDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address?: string;

  @IsString()
  @MinLength(6)
  password?: string;

  @IsEmail()
  email?: string;
}

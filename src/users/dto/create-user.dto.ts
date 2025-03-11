import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from './user-role.type';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: string;
}

import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { EXPERIENCE } from 'src/constant/experience.constant';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsNumber()
  experience: EXPERIENCE;

  @IsString()
  @IsOptional()
  phone: string;

  @IsNumber()
  nomina: number;
}

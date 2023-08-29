import { IsEnum, IsNumber } from 'class-validator';
import { EXPERIENCE } from 'src/constant/experience.constant';

export class CreateCommissionDto {
  @IsNumber()
  profit: number;

  @IsEnum(EXPERIENCE)
  experience: EXPERIENCE;

  @IsNumber()
  target: number;
}

import { IsEnum, IsNumber } from 'class-validator';
import { EXPERIENCE } from 'src/constant/experience.constant';

export class CreateCommissionDto {
  @IsNumber()
  profit: number;

  @IsNumber()
  condition: number;

  @IsEnum(EXPERIENCE)
  experience: EXPERIENCE;
}

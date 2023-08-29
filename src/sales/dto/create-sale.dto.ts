import { IsNumber, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  price: number;

  @IsUUID()
  userId: string;
}

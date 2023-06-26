import { IsNotEmpty } from 'class-validator';

export class PriceDto {
  @IsNotEmpty()
  fromId: number;

  @IsNotEmpty()
  toId: number;

  @IsNotEmpty()
  carId: number;

  @IsNotEmpty()
  price: number;
}

export class UpdatePriceDto {
  fromId: number;
  toId: number;
  carId: number;
  price: number;
}

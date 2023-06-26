import { IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  fromId: number;

  @IsNotEmpty()
  toId: number;

  @IsNotEmpty()
  carId: number;

  @IsNotEmpty()
  reservationDate: Date;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  passengerName: string;

  @IsNotEmpty()
  passengerPhone: string;
}

export class ReservationUpdateDto {
  fromId: number;
  toId: number;
  carId: number;
  reservationDate: Date;
  price: number;
  passengerName: string;
  passengerPhone: string;
}

export class ReservationPriceDto {
  @IsNotEmpty()
  fromId: number;

  @IsNotEmpty()
  toId: number;

  @IsNotEmpty()
  carId: number;
}

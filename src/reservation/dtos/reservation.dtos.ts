import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {

  agentId: number;

  @IsNotEmpty()
  fromId: number;

  @IsNotEmpty()
  toId: number;

  @IsNotEmpty()
  carId: number;

  @IsNotEmpty()
  reservationDate: Date;

  @IsEmpty()
  price: number;

  @IsNotEmpty()
  passengerName: string;

  @IsNotEmpty()
  passengerPhone: string;

  passengerEmail: string;

  passengerAdultsCount: number;

  passengerChildsCount: number;

  passengerGender: string;

  passengerBabyChair: number;

  amplifier: number;

  passengerPay: number;

  driverNote: string;

  operationNote: string;

  flightNo: string;

  passengerPayCurrency: string;

  currency: string;
}

export class ReservationUpdateDto {
  agentId: string;
  fromId: number;
  toId: number;
  carId: number;
  reservationDate: Date;
  price: number;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  passengerAdultsCount: number;
  passengerChildsCount: number;
  passengerGender: string;
  passengerBabyChair: number;
  amplifier: number;
  passengerPay: number;
  driverNote: string;
  operationNote: string;
  flightNo: string;
}

export class ReservationPriceDto {
  @IsNotEmpty()
  fromId: number;

  @IsNotEmpty()
  toId: number;

  @IsNotEmpty()
  carId: number;
}

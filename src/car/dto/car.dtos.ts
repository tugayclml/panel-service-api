import { IsNotEmpty } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  numberOfPeople: number;
}

export class UpdateCarDto {
  name: string;
  model: string;
  numberOfPeople: number;
}

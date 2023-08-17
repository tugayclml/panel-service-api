import { IsNotEmpty } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  numberOfPeople: number;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  plate: string;

  employeeIds: number[];
}

export class UpdateCarDto {
  name: string;
  model: string;
  numberOfPeople: number;
  make: string;
  year: string;
  plate: string;
  employeeIds: number[];
}

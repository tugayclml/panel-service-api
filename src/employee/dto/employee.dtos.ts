import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    nationality: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    identificationNumber: string;
}

export class UpdateEmployeeDto {
    firstName: string;
    lastName: string;
    gender: string;
    nationality: string;
    address: string;
    phoneNumber: string;
    identificationNumber: string;
}
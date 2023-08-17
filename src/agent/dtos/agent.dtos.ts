import { IsNotEmpty } from "class-validator";

export class CreateAgentDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phoneNumber: string;
}

export class UpdateAgentDto {
    name: string;
    phoneNumber: string;
}

export class UpdateAgentPrices {
    prices: object[]
}
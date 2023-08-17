import { IsNotEmpty } from "class-validator";

export class CreateColorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    colorCode: string;
}

export class UpdateColorDto {
    name: string;
    colorCode: string;
}
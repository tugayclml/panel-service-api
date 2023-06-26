import { IsNotEmpty } from 'class-validator';

export class SectionDto {
  @IsNotEmpty()
  sectionName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  description: string;
}

import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCheckoutDto {
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}

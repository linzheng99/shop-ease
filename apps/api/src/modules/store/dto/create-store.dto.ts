import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

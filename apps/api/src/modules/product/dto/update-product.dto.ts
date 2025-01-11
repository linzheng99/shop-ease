import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductVariantDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  sizeId: string;

  @IsString()
  @IsOptional()
  colorId: string;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  storeId: string;

  @IsArray()
  @IsString()
  @IsOptional()
  images: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  productVariants: ProductVariantDto[];
}

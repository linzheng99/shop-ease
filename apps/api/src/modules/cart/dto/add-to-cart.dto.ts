import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  productVariantId: string;

  storeId?: string;
  @IsOptional()
  sizeId?: string;

  @IsOptional()
  colorId?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

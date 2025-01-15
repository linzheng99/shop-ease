import { IsArray, IsOptional, IsString } from 'class-validator';
import { TransformStringArray } from 'src/common/decorators/transform-array-decorator';

export class FilterProductsDto {
  @IsString()
  storeId: string;

  @IsOptional()
  @IsArray()
  @TransformStringArray()
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @TransformStringArray()
  colorIds?: string[];

  @IsOptional()
  @IsArray()
  @TransformStringArray()
  sizeIds?: string[];
}

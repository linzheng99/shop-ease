import { IsBoolean, IsOptional } from 'class-validator';

export class SearchBillboardDto {
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

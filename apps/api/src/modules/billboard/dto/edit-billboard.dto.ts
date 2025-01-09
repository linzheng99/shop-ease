import { IsNotEmpty, IsString } from 'class-validator';

export class EditBillboardDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  storeId: string;
}

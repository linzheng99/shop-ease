import { Controller, Delete, Param } from '@nestjs/common';
import { Public } from 'src/common/decorators/public-decorator';

import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Public()
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return await this.imageService.deleteImage(id);
  }
}

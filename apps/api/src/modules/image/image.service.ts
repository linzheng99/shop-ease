import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class ImageService {
  constructor(
    private prisma: PrismaService,
    private uploadsService: UploadsService,
  ) {}

  async createImage(name: string, url: string) {
    const image = await this.prisma.image.create({
      data: {
        name,
        url,
      },
    });
    return image;
  }

  async getImage(id: string) {
    return this.prisma.image.findUnique({
      where: { id },
    });
  }

  async deleteImage(id: string) {
    await this.uploadsService.deleteFile(id);
    const image = await this.prisma.image.delete({
      where: { id },
    });
    return image;
  }
}

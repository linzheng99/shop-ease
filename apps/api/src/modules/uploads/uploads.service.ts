import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadsService {
  private readonly uploadDir = 'uploads';

  constructor(private prisma: PrismaService) {
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ id: string; name: string; url: string }> {
    const image = await this.prisma.image.create({
      data: {
        name: file.filename,
        url: file.path,
      },
    });

    return {
      id: image.id,
      name: image.name,
      url: image.url,
    };
  }

  async deleteFile(id: string): Promise<void> {
    const image = await this.prisma.image.findUnique({
      where: { id },
    });
    if (!image) {
      throw new Error('Image not found');
    }
    const filePath = path.join(this.uploadDir, image.name);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file ${id}:`, error);
    }
  }
}

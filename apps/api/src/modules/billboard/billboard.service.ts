import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBillboardDto } from './dto/create-billboard.dto';
import { EditBillboardDto } from './dto/edit-billboard.dto';

@Injectable()
export class BillboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getBillboards(userId: string, storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    return await this.prisma.billboard.findMany({
      where: { storeId },
      include: { image: true },
    });
  }

  async createBillboard(data: CreateBillboardDto) {
    return await this.prisma.billboard.create({
      data,
    });
  }

  async deleteBillboard(id: string) {
    return await this.prisma.billboard.delete({
      where: { id },
    });
  }

  async getBillboard(id: string) {
    return await this.prisma.billboard.findUnique({
      where: { id },
      include: { image: true },
    });
  }

  async editBillboard(userId: string, id: string, body: EditBillboardDto) {
    const store = await this.prisma.store.findUnique({
      where: { id: body.storeId, userId },
    });

    if (!store) {
      throw new UnauthorizedException('Store not found');
    }

    const billboard = await this.prisma.billboard.findUnique({
      where: { id },
    });

    if (!billboard) {
      throw new NotFoundException('Billboard not found');
    }

    return await this.prisma.billboard.update({
      where: { id },
      data: body,
    });
  }
}

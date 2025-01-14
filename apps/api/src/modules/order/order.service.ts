import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  deleteOrder(id: string, userId: string) {
    return this.prisma.order.delete({
      where: { id, userId },
    });
  }
}

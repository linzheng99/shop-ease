import { Controller, Delete, Get, Param, Request } from '@nestjs/common';
import { User } from '@prisma/client';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  async getOrders(@Request() req: { user: User }) {
    return this.orderService.getOrders(req.user.id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string, @Request() req: { user: User }) {
    return this.orderService.deleteOrder(id, req.user.id);
  }
}

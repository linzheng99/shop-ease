import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req: { user: User }) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  async addToCart(@Request() req: { user: User }, @Body() data: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, data);
  }

  @Patch(':id')
  async updateCartItem(
    @Request() req: { user: User },
    @Param('id') id: string,
    @Body() data: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(req.user.id, id, data);
  }

  @Delete('remove/:id')
  async removeFromCart(
    @Request() req: { user: User },
    @Param('id') id: string,
  ) {
    return this.cartService.removeFromCart(req.user.id, id);
  }

  @Delete('clear')
  async clearCart(@Request() req: { user: User }) {
    return this.cartService.clearCart(req.user.id);
  }
}

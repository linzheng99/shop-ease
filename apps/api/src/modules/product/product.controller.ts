import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public-decorator';

import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('list/:storeId')
  async getProducts(@Param('storeId') storeId: string) {
    return this.productService.getProducts(storeId);
  }

  @Public()
  @Get('filter')
  async filterProducts(@Query() filterDto: FilterProductsDto) {
    return this.productService.filterProducts(filterDto);
  }

  @Post('create')
  async createProduct(
    @Request() req: { user: User },
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(req.user.id, createProductDto);
  }

  @Public()
  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(productId);
  }

  @Patch(':productId')
  async updateProduct(
    @Request() req: { user: User },
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      req.user.id,
      productId,
      updateProductDto,
    );
  }

  @Delete(':storeId/:productId')
  async deleteProduct(
    @Request() req: { user: User },
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.deleteProduct(req.user.id, storeId, productId);
  }
}

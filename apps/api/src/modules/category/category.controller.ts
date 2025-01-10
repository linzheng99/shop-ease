import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  create(@Request() req: { user: User }, @Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user.id, body);
  }

  @Get('list/:storeId')
  getCategories(
    @Request() req: { user: User },
    @Param('storeId') storeId: string,
  ) {
    return this.categoryService.getCategories(req.user.id, storeId);
  }

  @Delete(':storeId/:id')
  deleteCategory(
    @Request() req: { user: User },
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    return this.categoryService.deleteCategory(req.user.id, storeId, id);
  }
}

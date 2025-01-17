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
import { Public } from 'src/common/decorators/public-decorator';

import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('create')
  create(@Request() req: { user: User }, @Body() body: CreateColorDto) {
    return this.colorService.createColor(req.user.id, body);
  }

  @Public()
  @Get('list/:storeId')
  getColors(@Param('storeId') storeId: string) {
    return this.colorService.getColors(storeId);
  }

  @Delete(':storeId/:id')
  deleteColor(
    @Request() req: { user: User },
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    return this.colorService.deleteColor(req.user.id, storeId, id);
  }
}

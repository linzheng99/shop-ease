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

import { CreateSizeDto } from './dto/create-size.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post('create')
  create(@Request() req: { user: User }, @Body() body: CreateSizeDto) {
    return this.sizeService.createSize(req.user.id, body);
  }

  @Public()
  @Get('list/:storeId')
  getSizes(@Param('storeId') storeId: string) {
    return this.sizeService.getSizes(storeId);
  }

  @Delete(':storeId/:id')
  deleteSize(
    @Request() req: { user: User },
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    return this.sizeService.deleteSize(req.user.id, storeId, id);
  }
}

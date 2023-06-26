import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceDto, UpdatePriceDto } from './dto/price.dtos';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  async createPrice(@Body() priceDto: PriceDto) {
    return this.priceService.createPrice(priceDto);
  }

  @Get()
  async getPrices() {
    return this.priceService.getPrices();
  }

  @Get(':id')
  async getPrice(@Param('id') id: number) {
    return this.priceService.getPrice(id);
  }

  @Patch(':id')
  async updatePrice(
    @Param('id') id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ) {
    return this.priceService.updatePrice(id, updatePriceDto);
  }

  @Delete(':id')
  async deletePrice(@Param('id') id: number) {
    return this.priceService.deletePrice(id);
  }
}

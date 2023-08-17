import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dtos/color.dtos';

@Controller('color')
export class ColorController {
    constructor(private readonly colorService: ColorService) { }

    @Get()
    async getColors() {
        return this.colorService.getColors();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.colorService.getColorById(id);
    }

    @Post()
    async create(@Body() createColorDto: CreateColorDto) {
        return this.colorService.createColor(createColorDto);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateColorDto: UpdateColorDto){
        return this.colorService.updateColor(id, updateColorDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.colorService.deleteColor(id);
    }
}

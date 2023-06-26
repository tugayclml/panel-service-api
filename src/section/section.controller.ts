import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SectionDto } from './dto/section.dtos';
import { SectionService } from './section.service';
import { SectionUpdateDto } from './dto/sectionUpdate.dtos';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async createSection(@Body() sectionDto: SectionDto) {
    return await this.sectionService.createSection(sectionDto);
  }

  @Get()
  async getSections() {
    return await this.sectionService.getSections();
  }

  @Get('/:id')
  async getSection(@Param('id') id: number) {
    return await this.sectionService.getSection(id);
  }

  @Patch('/:id')
  async updateSection(
    @Param('id') id: number,
    @Body() updateSectionDto: SectionUpdateDto,
  ) {
    return await this.sectionService.updateSection(id, updateSectionDto);
  }

  @Delete('/:id')
  async deleteSection(@Param('id') id: number) {
    return await this.sectionService.deleteSection(id);
  }
}

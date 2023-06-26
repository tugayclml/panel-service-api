import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/models/section.entity';
import { Repository } from 'typeorm';
import { SectionDto } from './dto/section.dtos';
import { SectionUpdateDto } from './dto/sectionUpdate.dtos';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async createSection(sectionDto: SectionDto) {
    const section = new Section();
    section.sectionName = sectionDto.sectionName;
    section.city = sectionDto.city;
    section.district = sectionDto.district;
    section.street = sectionDto.street;
    section.description = sectionDto.description;

    return await this.sectionRepository.save(section);
  }

  async getSections() {
    return await this.sectionRepository.find({
      order: { sectionName: 'DESC' },
    });
  }

  async getSection(id: number) {
    return await this.sectionRepository.findOneBy({ id: id });
  }

  async updateSection(id: number, updateSectionDto: SectionUpdateDto) {
    return await this.sectionRepository
      .createQueryBuilder()
      .update()
      .set(updateSectionDto)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteSection(id: number) {
    return await this.sectionRepository.delete(id);
  }
}

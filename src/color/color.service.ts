import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/models/color.entity';
import { Repository } from 'typeorm';
import { CreateColorDto, UpdateColorDto } from './dtos/color.dtos';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Color) private colorRepository: Repository<Color>,
    ) { }

    async getColors() {
        return this.colorRepository.find();
    }

    async getColorById(id: number): Promise<Color> {
        return this.colorRepository.findOneBy({ id: id });
    }

    async createColor(colorCreateDto: CreateColorDto) {
        return this.colorRepository.save(colorCreateDto);
    }

    async updateColor(id: number, updateColorDto: UpdateColorDto) {
        const existingColor = await this.colorRepository.findOneBy({id: id});
        if (!existingColor) {
            throw new Error('Color not found');
        }

        return this.colorRepository.update(id, updateColorDto);
    }

    async deleteColor(id: number){
        await this.colorRepository.delete(id);
    }
}

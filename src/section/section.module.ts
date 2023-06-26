import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/models/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionService],
  controllers: [SectionController],
})
export class SectionModule {}

import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from 'src/models/price.entity';
import { Section } from 'src/models/section.entity';
import { Car } from 'src/models/car.entity';
import { Agent } from 'src/models/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Price, 
    Section, 
    Car,
    Agent
  ])],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}

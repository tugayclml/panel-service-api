import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/models/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}

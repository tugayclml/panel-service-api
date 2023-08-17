import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/models/car.entity';
import { Employee } from 'src/models/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Employee])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}

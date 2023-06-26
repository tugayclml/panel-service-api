import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/models/reservation.entity';
import { Price } from 'src/models/price.entity';
import { Section } from 'src/models/section.entity';
import { Car } from 'src/models/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Price, Section, Car])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}

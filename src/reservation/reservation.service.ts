import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/models/reservation.entity';
import { Equal, Repository } from 'typeorm';
import {
  CreateReservationDto,
  ReservationPriceDto,
  ReservationUpdateDto,
} from './dtos/reservation.dtos';
import { Price } from 'src/models/price.entity';
import { Section } from 'src/models/section.entity';
import { Car } from 'src/models/car.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async createReservation(createReservationDto: CreateReservationDto) {
    const fromSection = await this.sectionRepository.findOneBy({
      id: createReservationDto.fromId,
    });

    const toSection = await this.sectionRepository.findOneBy({
      id: createReservationDto.toId,
    });

    const car = await this.carRepository.findOneBy({
      id: createReservationDto.carId,
    });

    const reservation = new Reservation();
    reservation.from = fromSection;
    reservation.to = toSection;
    reservation.car = car;
    reservation.price = createReservationDto.price;
    reservation.reservationDate = createReservationDto.reservationDate;
    reservation.passengerName = createReservationDto.passengerName;
    reservation.passengerPhone = createReservationDto.passengerPhone;

    return await this.reservationRepository.save(reservation);
  }

  async updateReservation(
    id: number,
    reservationUpdateDto: ReservationUpdateDto,
  ) {
    return await this.reservationRepository
      .createQueryBuilder()
      .update()
      .set(reservationUpdateDto)
      .where('id = :id', { id: id })
      .execute();
  }

  async approveReservation(id: number) {
    return await this.reservationRepository
      .createQueryBuilder()
      .update()
      .set({ status: 'Onaylandı' })
      .where('id = :id', { id: id })
      .execute();
  }

  async declineReservation(id: number) {
    return await this.reservationRepository
      .createQueryBuilder()
      .update()
      .set({ status: 'İptal edildi' })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteReservation(id: number) {
    return await this.reservationRepository.delete(id);
  }

  async getReservation(id: number) {
    return await this.reservationRepository.findOne({
      where: { id: id },
      relations: { from: true, to: true, car: true },
    });
  }

  async getReservations() {
    return await this.reservationRepository.find({
      relations: {
        from: true,
        to: true,
        car: true,
      },
      order: { createdDate: 'ASC' },
    });
  }

  async getReservationPrice(reservationPriceDto: ReservationPriceDto) {
    const price = await this.priceRepository.findOne({
      where: {
        from: Equal(reservationPriceDto.fromId),
        to: Equal(reservationPriceDto.toId),
        car: Equal(reservationPriceDto.carId),
      },
    });

    return { price: price.price };
  }
}

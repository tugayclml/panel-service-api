import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/models/reservation.entity';
import { Between, Equal, Repository } from 'typeorm';
import {
  CreateReservationDto,
  ReservationPriceDto,
  ReservationUpdateDto,
} from './dtos/reservation.dtos';
import { Price } from 'src/models/price.entity';
import { Section } from 'src/models/section.entity';
import { Car } from 'src/models/car.entity';
import { extractTokenPayload } from 'src/utils/utils';
import { Request } from 'express';
import { Agent } from 'src/models/agent.entity';

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
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) { }

  async createReservation(createReservationDto: CreateReservationDto, req: Request) {
    const tokenPayload = extractTokenPayload(req)

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
    reservation.price = createReservationDto.price ? createReservationDto.price : 1500;
    reservation.reservationDate = createReservationDto.reservationDate;
    reservation.passengerName = createReservationDto.passengerName;
    reservation.passengerPhone = createReservationDto.passengerPhone;
    reservation.user = tokenPayload['user'].id
    if (tokenPayload['user'].username && tokenPayload['user'].role === "AGENT") {
      const agent = await this.agentRepository.findOneBy({
        name: tokenPayload['user'].username
      })

      reservation.agent = agent
    } else {
      const agent = await this.agentRepository.findOneBy({
        id: createReservationDto.agentId
      })

      reservation.agent = agent
    }
    reservation.passengerEmail = createReservationDto.passengerEmail
    reservation.passengerAdultsCount = createReservationDto.passengerAdultsCount
    reservation.passengerChildsCount = createReservationDto.passengerChildsCount
    reservation.passengerBabyChair = createReservationDto.passengerBabyChair
    reservation.amplifier = createReservationDto.amplifier
    reservation.passengerPay = createReservationDto.passengerPay
    reservation.driverNote = createReservationDto.driverNote
    reservation.operationNote = createReservationDto.operationNote
    reservation.flightNo = createReservationDto.flightNo
    reservation.passengerPayCurrency = createReservationDto.passengerPayCurrency
    reservation.currency = createReservationDto.currency

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
      relations: { from: true, to: true, car: true, agent: true },
    });
  }

  async getReservationsByStatus(status: string, query) {
    return await this.reservationRepository.find({
      where: {
        status: status,
      },
      relations: {
        from: true,
        to: true,
        car: true,
        agent: true
      },
      order: { createdDate: 'DESC' },
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

    if (price)
      return { price: price.price };
    else
      return { price: 0 }
  }
}

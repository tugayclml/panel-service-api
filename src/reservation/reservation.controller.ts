import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  ReservationPriceDto,
  ReservationUpdateDto,
} from './dtos/reservation.dtos';
import { Request } from 'express';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto, @Req() req: Request) {
    return await this.reservationService.createReservation(
      createReservationDto, req
    );
  }

  @Get('/status/:status')
  async getReservations(@Param('status') status: string) {
    return this.reservationService.getReservationsByStatus(status);
  }

  @Get('/:id')
  async getReservation(@Param('id') id: number) {
    return this.reservationService.getReservation(id);
  }

  @Post('/price')
  async getReservationPrice(@Body() reservationPriceDto: ReservationPriceDto) {
    return this.reservationService.getReservationPrice(reservationPriceDto);
  }

  @Patch(':id')
  async updateReservation(
    @Param('id') id: number,
    @Body() reservationUpdateDto: ReservationUpdateDto,
  ) {
    return this.reservationService.updateReservation(id, reservationUpdateDto);
  }

  @Patch(':id/approve')
  async approveReservation(@Param('id') id: number) {
    return this.reservationService.approveReservation(id);
  }

  @Patch(':id/decline')
  async declineReservation(@Param('id') id: number) {
    return this.reservationService.declineReservation(id);
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: number) {
    return this.reservationService.deleteReservation(id);
  }
}

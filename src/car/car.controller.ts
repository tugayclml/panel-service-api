import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto, UpdateCarDto } from './dto/car.dtos';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCar(@Body() carDto: CarDto) {
    return this.carService.createCar(carDto);
  }

  @Get()
  async getCars() {
    return this.carService.getCars();
  }

  @Get('/:id')
  async getCar(@Param('id') id: number) {
    return this.carService.getCar(id);
  }

  @Patch('/:id')
  async updateCar(@Body() updateCarDto: UpdateCarDto, @Param('id') id: number) {
    return this.carService.updateCar(id, updateCarDto);
  }

  @Delete('/:id')
  async deleteCar(@Param('id') id: number) {
    return this.carService.deleteCar(id);
  }
}

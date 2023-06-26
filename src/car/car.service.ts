import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/models/car.entity';
import { Repository } from 'typeorm';
import { CarDto, UpdateCarDto } from './dto/car.dtos';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  async createCar(carDto: CarDto) {
    const car = new Car();
    car.model = carDto.model;
    car.name = carDto.name;
    car.numberOfPeople = carDto.numberOfPeople;

    return await this.carRepository.save(car);
  }

  async getCars() {
    return await this.carRepository.find();
  }

  async getCar(id: number) {
    return await this.carRepository.findOneBy({ id: id });
  }

  async updateCar(id: number, updateCarDto: UpdateCarDto) {
    return await this.carRepository
      .createQueryBuilder()
      .update()
      .set(updateCarDto)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteCar(id: number) {
    return await this.carRepository.delete(id);
  }
}

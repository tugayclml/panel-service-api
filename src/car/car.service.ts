import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/models/car.entity';
import { Repository } from 'typeorm';
import { CarDto, UpdateCarDto } from './dto/car.dtos';
import { Employee } from 'src/models/employee.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
  ) { }

  async createCar(carDto: CarDto) {
    const employees = []
    for (const employeeId of carDto.employeeIds) {
      const employee = await this.employeeRepository.findOneBy({ id: employeeId })
      employees.push(employee)
    }

    const car = new Car();
    car.model = carDto.model;
    car.name = carDto.name;
    car.numberOfPeople = carDto.numberOfPeople;
    car.make = carDto.make
    car.year = carDto.year
    car.plate = carDto.plate
    car.employees = employees

    return await this.carRepository.save(car);
  }

  async getCars() {
    return await this.carRepository.find();
  }

  async getCar(id: number) {
    return await this.carRepository.findOne({
      where: { id: id },
      relations: { employees: true }
    });
  }

  async updateCar(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.findOneBy({ id: id })

    const employees = []
    for (const employeeId of updateCarDto.employeeIds) {
      const employee = await this.employeeRepository.findOneBy({ id: employeeId })

      employees.push(employee)
    }

    delete updateCarDto.employeeIds
    car.employees = employees
    await this.carRepository.save(car)

    // return await this.carRepository
    //   .createQueryBuilder()
    //   .update()
    //   .set(updateCarDto)
    //   .where('id = :id', { id: id })
    //   .execute();
  }

  async deleteCar(id: number) {
    return await this.carRepository.delete(id);
  }
}

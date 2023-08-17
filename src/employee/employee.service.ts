import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/models/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dtos';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        const employee = new Employee()
        employee.firstName = createEmployeeDto.firstName
        employee.lastName = createEmployeeDto.lastName
        employee.gender = createEmployeeDto.gender
        employee.identificationNumber = createEmployeeDto.identificationNumber
        employee.address = createEmployeeDto.address
        employee.nationality = createEmployeeDto.nationality
        employee.phoneNumber = createEmployeeDto.phoneNumber

        return await this.employeeRepository.save(employee)
    }

    async getEmployee(id: number) {
        return await this.employeeRepository.findOneBy({ id: id })
    }

    async getEmployees() {
        return await this.employeeRepository.find()
    }

    async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        return await this.employeeRepository.update(id, updateEmployeeDto)
    }

    async deleteEmployee(id: number) {
        return await this.employeeRepository.delete(id)
    }
}

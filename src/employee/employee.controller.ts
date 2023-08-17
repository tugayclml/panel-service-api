import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dtos';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) { }

    @Post()
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return await this.employeeService.createEmployee(createEmployeeDto)
    }

    @Get()
    async getEmployees() {
        return await this.employeeService.getEmployees()
    }

    @Get(':id')
    async getEmployee(@Param('id') id: number) {
        return await this.employeeService.getEmployee(id)
    }

    @Patch(':id')
    async updateEmployee(@Param('id') id: number,@Body() updateEmployeeDto: UpdateEmployeeDto) {
        return await this.employeeService.updateEmployee(id, updateEmployeeDto)
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number) {
        return await this.employeeService.deleteEmployee(id)
    }
}

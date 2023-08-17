import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    gender: string;

    @Column()
    nationality: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    identificationNumber: string;

    @ManyToOne(() => Car, (car) => car.employees)
    car: Car
}

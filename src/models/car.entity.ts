import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';
import { Reservation } from './reservation.entity';
import { Employee } from './employee.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  make: string;

  @Column()
  plate: string;

  @Column()
  year: string

  @Column()
  numberOfPeople: number;

  @OneToMany(() => Price, (price) => price.car)
  carPrices: Price[];

  @OneToMany(() => Reservation, (reservation) => reservation.car, {
    nullable: true,
  })
  reservations: Reservation[];

  @OneToMany(() => Employee, (employee) => employee.car, { cascade: true })
  employees: Employee[]
}

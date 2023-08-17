import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './section.entity';
import { Car } from './car.entity';
import { User } from './user.entity';
import { Agent } from './agent.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Section, (section) => section.fromReservations)
  from: Section;

  @ManyToOne(() => Section, (section) => section.toReservations)
  to: Section;

  @ManyToOne(() => Car, (car) => car.reservations)
  car: Car;

  @Column({ type: 'timestamptz' })
  reservationDate: Date;

  @Column({ nullable: true })
  price: number;

  @Column({ default: 'Beklemede' })
  status: string;

  @Column({ nullable: true })
  passengerName: string;

  @Column({nullable: true})
  passengerEmail: string;

  @Column({ nullable: true })
  passengerPhone: string;

  @Column({ default: 0 })
  passengerAdultsCount: number;

  @Column({ default: 0 })
  passengerChildsCount: number;

  @Column({ nullable: true })
  passengerGender: string;

  @Column({ nullable: true })
  passengerBabyChair: number;

  @Column({ nullable: true })
  amplifier: number;

  @Column({ default: 0 })
  passengerPay: number;

  @Column({ nullable: true })
  driverNote: string;

  @Column({ nullable: true })
  operationNote: string;

  @Column({ nullable: true })
  flightNo: string;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;

  @ManyToOne(() => Agent, (agent) => agent.reservations)
  agent: Agent

  @Column({nullable: true})
  currency: string;

  @Column({nullable: true})
  passengerPayCurrency: string;
}

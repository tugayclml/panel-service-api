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

  @Column()
  price: number;

  @Column({ default: 'Beklemede' })
  status: string;

  @Column()
  passengerName: string;

  @Column()
  passengerPhone: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate: Date;
}

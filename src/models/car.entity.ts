import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';
import { Reservation } from './reservation.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  numberOfPeople: number;

  @OneToMany(() => Price, (price) => price.car)
  carPrices: Price[];

  @OneToMany(() => Reservation, (reservation) => reservation.car, {
    nullable: true,
  })
  reservations: Reservation[];
}

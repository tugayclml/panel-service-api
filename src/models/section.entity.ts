import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';
import { Reservation } from './reservation.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  sectionName: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  description: string;

  @OneToMany(() => Price, (price) => price.from)
  fromPrices: Price[];

  @OneToMany(() => Price, (price) => price.to)
  toPrices: Price[];

  @OneToMany(() => Reservation, (reservation) => reservation.from)
  fromReservations: Reservation[];

  @OneToMany(() => Reservation, (reservation) => reservation.to)
  toReservations: Reservation[];
}

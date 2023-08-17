import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";
import { Price } from "./price.entity";

@Entity("agents")
export class Agent {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @OneToMany(() => Price, (price) => price.agent)
    prices: Price[]

    @OneToMany(() => Reservation, (reservation) => reservation.agent)
    reservations: Reservation[]
}
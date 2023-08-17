import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("currency")
export class Currency {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;
}
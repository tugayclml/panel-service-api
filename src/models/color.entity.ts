import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("colors")
export class Color {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    colorCode: string;
}
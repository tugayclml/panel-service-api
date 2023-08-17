import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section.entity';
import { Car } from './car.entity';
import { Agent } from './agent.entity';

@Entity('prices')
export class Price {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Section, (section) => section.fromPrices, {
    onDelete: 'CASCADE',
  })
  from: Section;

  @ManyToOne(() => Section, (section) => section.toPrices, {
    onDelete: 'CASCADE',
  })
  to: Section;

  @ManyToOne(() => Car, (car) => car.carPrices)
  car: Car;

  @Column()
  price: number;

  @ManyToOne(() => Agent, (agent) => agent.prices)
  agent: Agent
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from 'src/models/price.entity';
import { Equal, Repository } from 'typeorm';
import { PriceDto, UpdatePriceDto } from './dto/price.dtos';
import { Section } from 'src/models/section.entity';
import { Car } from 'src/models/car.entity';
import { Agent } from 'src/models/agent.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) { }

  async createPrice(priceDto: PriceDto) {
    const fromSection = await this.sectionRepository.findOneBy({
      id: priceDto.fromId,
    });

    const toSection = await this.sectionRepository.findOneBy({
      id: priceDto.toId,
    });

    const agent = await this.agentRepository.findOneBy({
      id: priceDto.agentId
    })

    const car = await this.carRepository.findOneBy({ id: priceDto.carId });

    const price = new Price();
    price.from = fromSection;
    price.to = toSection;
    price.car = car;
    price.price = priceDto.price;
    price.agent = agent

    return await this.priceRepository.save(price);
  }

  async getPriceListBySection(from: string, to: string) {
    return await this.priceRepository.find({
      where: { from: Equal(from), to: Equal(to) },
      relations: { from: true, to: true, car: true, agent: true }
    })
  }

  async getPrices() {
    const prices = await this.priceRepository
      .createQueryBuilder("price")
      .leftJoinAndSelect("price.from", "fromSection")
      .leftJoinAndSelect("price.to", "toSection")
      .leftJoinAndSelect("price.agent", "agents")
      .leftJoinAndSelect("price.car", "cars")
      .distinctOn(["price.from", "price.to"])
      .getMany()

    return prices
  }

  async getPrice(id: number) {
    return await this.priceRepository.findOne({
      where: { id: id },
      relations: { from: true, to: true, car: true, agent: true },
    });
  }

  async updatePrice(id: number, updatePriceDto: UpdatePriceDto) {
    console.log(updatePriceDto);

    const fromSection = await this.sectionRepository.findOneBy({
      id: updatePriceDto.fromId,
    });

    const toSection = await this.sectionRepository.findOneBy({
      id: updatePriceDto.toId,
    });

    const car = await this.carRepository.findOneBy({
      id: updatePriceDto.carId,
    });

    return await this.priceRepository
      .createQueryBuilder()
      .update()
      .set({
        from: fromSection,
        to: toSection,
        car: car,
        price: updatePriceDto.price,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async deletePrice(id: number) {
    return this.priceRepository.delete(id);
  }
}

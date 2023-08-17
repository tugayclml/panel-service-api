import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/models/agent.entity';
import { Equal, Like, Repository } from 'typeorm';
import { CreateAgentDto, UpdateAgentDto } from './dtos/agent.dtos';
import { UserDto } from 'src/user/dtos/register.dtos';
import { hash } from 'bcrypt';
import { User } from 'src/models/user.entity';
import { extractTokenPayload } from 'src/utils/utils';
import { Request } from 'express';
import { Reservation } from 'src/models/reservation.entity';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent) private readonly agentRepository: Repository<Agent>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    ) { }

    async createAgent(createAgentDto: CreateAgentDto) {
        const agent = await this.agentRepository.save(createAgentDto)

        const userDto: UserDto = {
            username: createAgentDto.name,
            password: await hash(createAgentDto.password, 10),
            role: 'AGENT'
        }
        await this.userRepository.save(userDto)

        return agent
    }

    async getAgentByFirstLetter(letter: string) {
        return await this.agentRepository.find({
            where: { name: Like(`%${letter}%`) }
        })
    }

    async getAgents() {
        return await this.agentRepository.find()
    }

    async getAgentReservations(req: Request, status: string) {
        const tokenPayload = extractTokenPayload(req)

        return await this.reservationRepository.find({
            where: { user: Equal(tokenPayload['user'].id), status: status },
            relations: { from: true, to: true, car: true }
        })
    }

    async getAgentById(id: number) {
        return await this.agentRepository.findOne({
            where: { id: id },
            relations: { prices: { from: true, to: true, car: true } }
        })
    }

    async updateAgent(id: number, updateAgentDto: UpdateAgentDto) {
        return await this.agentRepository.update(id, updateAgentDto)
    }

    async deleteAgent(id: number) {
        return await this.agentRepository.delete(id)
    }
}

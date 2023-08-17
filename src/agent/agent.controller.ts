import { Controller, Post, Get, Patch, Delete, Param, Body, Req } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto, UpdateAgentDto } from './dtos/agent.dtos';
import { Request } from 'express';

@Controller('agent')
export class AgentController {
    constructor(
        private readonly agentService: AgentService
    ) {}

    @Post()
    async createAgent(@Body() createAgentDto: CreateAgentDto) {
        return await this.agentService.createAgent(createAgentDto)
    }

    @Get()
    async getAgents() {
        return await this.agentService.getAgents()
    }

    @Get('letter/:letter')
    async getAgentByFirstLetter(@Param('letter') letter: string) {
        return await this.agentService.getAgentByFirstLetter(letter)
    }

    @Get('/reservations/:status')
    async getAgentReservations(@Req() req: Request, @Param('status') status: string) {
        return await this.agentService.getAgentReservations(req, status)
    }

    @Get(':id')
    async getAgentById(@Param('id') id: number) {
        return await this.agentService.getAgentById(id)
    }

    @Patch(':id')
    async updateAgent(@Param('id') id: number, @Body() updateAgentDto: UpdateAgentDto) {
        return await this.agentService.updateAgent(id, updateAgentDto)
    }

    @Delete(':id')
    async deleteAgent(@Param('id') id: number) {
        return await this.agentService.deleteAgent(id)
    }
}

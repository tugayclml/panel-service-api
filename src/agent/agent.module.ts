import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'src/models/agent.entity';
import { User } from 'src/models/user.entity';
import { Reservation } from 'src/models/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, User, Reservation])],
  providers: [AgentService],
  controllers: [AgentController]
})
export class AgentModule {}

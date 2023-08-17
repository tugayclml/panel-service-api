import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { SectionModule } from './section/section.module';
import { Section } from './models/section.entity';
import { CarModule } from './car/car.module';
import { Car } from './models/car.entity';
import { PriceModule } from './price/price.module';
import { Price } from './models/price.entity';
import { Reservation } from './models/reservation.entity';
import { Agent } from './models/agent.entity';
import { AgentModule } from './agent/agent.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './models/employee.entity';
import { ColorModule } from './color/color.module';
import { Color } from './models/color.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST_REMOTE'),
        port: +configService.get<number>('DB_PORT_REMOTE'),
        username: configService.get('DB_USERNAME_REMOTE'),
        password: configService.get('DB_PASSWORD_REMOTE'),
        database: configService.get('DB_NAME_REMOTE'),
        entities: [User, Reservation, Section, Car, Price, Agent, Employee, Color],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ReservationModule,
    SectionModule,
    CarModule,
    PriceModule,
    AgentModule,
    EmployeeModule,
    ColorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

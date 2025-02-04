import { Module } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { TemperaturesController } from './temperatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperature } from './entities/temperature.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature, Location])],
  controllers: [TemperaturesController],
  providers: [TemperaturesService],
})
export class TemperaturesModule {}

import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Temperature } from 'src/temperatures/entities/temperature.entity';
import { Traffic } from 'src/traffics/entities/traffic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Temperature, Traffic])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

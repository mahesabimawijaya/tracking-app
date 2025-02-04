import { Module } from '@nestjs/common';
import { TrafficsService } from './traffics.service';
import { TrafficsController } from './traffics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traffic } from './entities/traffic.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Traffic, Location])],
  controllers: [TrafficsController],
  providers: [TrafficsService],
})
export class TrafficsModule {}

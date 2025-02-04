import { Module } from '@nestjs/common';
import { LocationsModule } from './locations/locations.module';
import { TrafficsModule } from './traffics/traffics.module';
import { TemperaturesModule } from './temperatures/temperatures.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LocationsModule,
    TrafficsModule,
    TemperaturesModule,
    DatabaseModule,
  ],
})
export class AppModule {}

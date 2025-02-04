import { Injectable } from '@nestjs/common';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { UpdateTemperatureDto } from './dto/update-temperature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temperature } from './entities/temperature.entity';
import { handleException } from 'src/utils/exception.util';
import { response } from 'src/utils/response.util';

@Injectable()
export class TemperaturesService {
  constructor(
    @InjectRepository(Temperature)
    private temperatureRepository: Repository<Temperature>,
  ) {}
  create(createTemperatureDto: CreateTemperatureDto) {
    return 'This action adds a new temperature';
  }

  async findAll() {
    try {
      const data = await this.temperatureRepository
        .createQueryBuilder('temperature')
        .leftJoinAndSelect('temperature.location', 'location')
        .select([
          'temperature.createdAt AS time',
          'location.name AS location',
          'temperature.value AS value',
        ])
        .orderBy('temperature.createdAt', 'ASC')
        .getRawMany();

      // Transform data into the expected format
      const groupedData: Record<string, any> = {};

      data.forEach((entry) => {
        const time = entry.time.toISOString(); // Format time
        if (!groupedData[time]) {
          groupedData[time] = { time };
        }
        groupedData[time][entry.location] = Number(entry.value);
      });

      // return Object.values(groupedData);

      const finalData = Object.values(groupedData);
      return response('Temperature reports fetched', finalData, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async findMax() {
    try {
      const maxTemp = await this.temperatureRepository
        .createQueryBuilder('temperature')
        .leftJoinAndSelect('temperature.location', 'location')
        .where('temperature.value = (SELECT MAX(t.value) FROM temperature t)')
        .getOne();

      if (!maxTemp) {
        return response('No temperature data found', null, true);
      }

      return response('Highest temperature fetched', maxTemp, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async findMin() {
    try {
      const minTemp = await this.temperatureRepository
        .createQueryBuilder('temperature')
        .leftJoinAndSelect('temperature.location', 'location')
        .where('temperature.value = (SELECT MIN(t.value) FROM temperature t)')
        .getOne();

      if (!minTemp) {
        return response('No temperature data found', null, true);
      }

      return response('Lowest temperature fetched', minTemp, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async findAvg() {
    try {
      const avgTemp = await this.temperatureRepository
        .createQueryBuilder('temperature')
        .select('ROUND(AVG(temperature.value), 2)', 'avg')
        .getRawOne();

      return response('Average temp fetched', avgTemp, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} temperature`;
  }

  update(id: number, updateTemperatureDto: UpdateTemperatureDto) {
    return `This action updates a #${id} temperature`;
  }

  remove(id: number) {
    return `This action removes a #${id} temperature`;
  }
}

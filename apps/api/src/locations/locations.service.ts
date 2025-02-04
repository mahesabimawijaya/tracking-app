import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { handleException } from 'src/utils/exception.util';
import { response } from 'src/utils/response.util';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location';
  }

  async findAll() {
    try {
      const rawData = await this.locationRepository
        .createQueryBuilder('location')
        .leftJoin('location.temperatures', 'temperature')
        .select([
          'DATE(temperature.createdAt) AS time',
          'location.name AS location',
          'array_agg(temperature.value) AS values',
        ])
        .groupBy('time, location.name')
        .orderBy('time', 'ASC')
        .getRawMany();

      // Transform to the required JSON structure
      const groupedData = rawData.reduce((acc, row) => {
        let entry = acc.find((item) => item.time === row.time);
        if (!entry) {
          entry = { time: row.time };
          acc.push(entry);
        }
        entry[row.location] = row.values[0]; // Extract first value
        return acc;
      }, []);

      return response('Fetched Locations', groupedData, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  async findOne(name: string) {
    try {
      const location = await this.locationRepository.findOne({
        where: {
          name,
        },
        relations: ['temperatures'],
      });

      return response('Fetched Location', location, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}

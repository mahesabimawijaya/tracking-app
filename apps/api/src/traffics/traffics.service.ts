import { Injectable, Logger } from '@nestjs/common';
import { CreateTrafficDto } from './dto/create-traffic.dto';
import { UpdateTrafficDto } from './dto/update-traffic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traffic } from './entities/traffic.entity';
import { Cron } from '@nestjs/schedule';
import { handleException } from 'src/utils/exception.util';
import { response } from 'src/utils/response.util';

@Injectable()
export class TrafficsService {
  private readonly logger = new Logger(TrafficsService.name);
  private readonly trafficStatuses = ['North', 'West', 'South', 'East'];

  constructor(
    @InjectRepository(Traffic)
    private trafficRepository: Repository<Traffic>,
  ) {}

  // Runs every 60 seconds
  @Cron('*/30 * * * * *') // Every 30 seconds
  async updateTrafficStatus() {
    this.logger.log('Cycling traffic status...');

    const traffics = await this.trafficRepository.find({
      relations: ['location'],
    });
    if (!traffics.length) {
      this.logger.warn('No traffic records found.');
      return;
    }

    for (const traffic of traffics) {
      // Get current index in the cycle
      const currentIndex = this.trafficStatuses.indexOf(traffic.status);
      const nextIndex = (currentIndex + 1) % this.trafficStatuses.length;
      const newStatus = this.trafficStatuses[nextIndex];

      // Update the traffic status
      await this.trafficRepository.update(traffic.id, {
        status: newStatus,
        updatedAt: new Date(),
      });

      this.logger.log(
        `Traffic at ${traffic.location.name} changed to ${newStatus}`,
      );
    }
  }

  create(createTrafficDto: CreateTrafficDto) {
    return 'This action adds a new traffic';
  }

  async findAll() {
    try {
      const traffics = await this.trafficRepository.find();

      return response('Traffics fetched', traffics, true);
    } catch (error) {
      handleException(error, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} traffic`;
  }

  update(id: number, updateTrafficDto: UpdateTrafficDto) {
    return `This action updates a #${id} traffic`;
  }

  remove(id: number) {
    return `This action removes a #${id} traffic`;
  }
}

import { Temperature } from 'src/temperatures/entities/temperature.entity';
import { Traffic } from 'src/traffics/entities/traffic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Temperature, (temperature) => temperature.location)
  temperatures: Temperature[];

  @OneToMany(() => Traffic, (traffic) => traffic.location)
  traffics: Traffic[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

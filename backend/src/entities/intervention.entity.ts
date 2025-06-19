import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Station } from './station.entity';
import { Photo } from './photo.entity';

export enum ConsumptionLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum IncidentType {
  NONE = 'none',
  STATION_DAMAGED = 'station_damaged',
  STATION_MOVED = 'station_moved',
  NON_TARGET_ANIMAL = 'non_target_animal',
  OTHER = 'other',
}

@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ConsumptionLevel,
    default: ConsumptionLevel.NONE,
  })
  consumptionLevel: ConsumptionLevel;

  @Column({ nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    enum: IncidentType,
    default: IncidentType.NONE,
  })
  incidentType: IncidentType;

  @Column({ nullable: true })
  incidentDescription: string;

  @Column({ default: false })
  baitReplaced: boolean;

  @Column({ default: false })
  stationCleaned: boolean;

  @ManyToOne(() => User, (user) => user.interventions)
  agent: User;

  @ManyToOne(() => Station, (station) => station.interventions, { onDelete: 'CASCADE' })
  station: Station;

  @OneToMany(() => Photo, (photo) => photo.intervention)
  photos: Photo[];

  @Column({ default: false })
  isSynchronized: boolean;

  @Column({ nullable: true })
  localCreatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

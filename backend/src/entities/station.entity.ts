import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Point } from 'geojson';
import { Site } from './site.entity';
import { Intervention } from './intervention.entity';

export enum StationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REMOVED = 'removed',
  DAMAGED = 'damaged',
}

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  identifier: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  planPositionX: number;

  @Column({ nullable: true })
  planPositionY: number;

  @Column({
    type: 'enum',
    enum: StationStatus,
    default: StationStatus.ACTIVE,
  })
  status: StationStatus;

  @Column({ nullable: true })
  removalReason: string;

  @ManyToOne(() => Site, (site) => site.stations, { onDelete: 'CASCADE' })
  site: Site;

  @OneToMany(() => Intervention, (intervention) => intervention.station)
  interventions: Intervention[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

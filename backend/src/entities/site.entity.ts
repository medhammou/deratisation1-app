import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Point } from 'geojson';
import { User } from './user.entity';
import { Station } from './station.entity';

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  clientReference: string;

  @Column({ type: 'geometry', nullable: true, spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @Column({ nullable: true })
  planImagePath: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, { nullable: true })
  client: User;

  @OneToMany(() => Station, (station) => station.site)
  stations: Station[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

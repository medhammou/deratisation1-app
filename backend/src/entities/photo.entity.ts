import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Intervention } from './intervention.entity';

export enum PhotoType {
  STATION = 'station',
  INCIDENT = 'incident',
  CONSUMPTION = 'consumption',
  OTHER = 'other',
}

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  filePath: string;

  @Column({ nullable: true })
  thumbnailPath: string;

  @Column({
    type: 'enum',
    enum: PhotoType,
    default: PhotoType.OTHER,
  })
  type: PhotoType;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Intervention, (intervention) => intervention.photos, { onDelete: 'CASCADE' })
  intervention: Intervention;

  @Column({ default: false })
  isSynchronized: boolean;

  @Column({ nullable: true })
  localCreatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

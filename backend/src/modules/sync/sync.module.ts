import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Site } from '../../entities/site.entity';
import { Station } from '../../entities/station.entity';
import { Intervention } from '../../entities/intervention.entity';
import { Photo } from '../../entities/photo.entity';
import { UsersModule } from '../users/users.module';
import { SitesModule } from '../sites/sites.module';
import { StationsModule } from '../stations/stations.module';
import { InterventionsModule } from '../interventions/interventions.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Site, Station, Intervention, Photo]),
    UsersModule,
    SitesModule,
    StationsModule,
    InterventionsModule,
    PhotosModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}

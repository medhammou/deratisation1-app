import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { SitesModule } from './modules/sites/sites.module';
import { StationsModule } from './modules/stations/stations.module';
import { InterventionsModule } from './modules/interventions/interventions.module';
import { AuthModule } from './modules/auth/auth.module';
import { SyncModule } from './modules/sync/sync.module';
import { PhotosModule } from './modules/photos/photos.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UsersModule,
    SitesModule,
    StationsModule,
    InterventionsModule,
    PhotosModule,
    AuthModule,
    SyncModule,
  ],
})
export class AppModule {}

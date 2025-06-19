import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../src/entities/user.entity';
import { Intervention, ConsumptionLevel, IncidentType } from '../src/entities/intervention.entity';
import { Photo, PhotoType } from '../src/entities/photo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

describe('PhotosController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  let interventionRepository: Repository<Intervention>;
  let photoRepository: Repository<Photo>;
  let testUser: User;
  let testIntervention: Intervention;
  let testPhoto: Photo;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    interventionRepository = moduleFixture.get<Repository<Intervention>>(getRepositoryToken(Intervention));
    photoRepository = moduleFixture.get<Repository<Photo>>(getRepositoryToken(Photo));

    // Créer un utilisateur de test
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('testpassword', salt);

    testUser = userRepository.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });

    await userRepository.save(testUser);

    // Créer une intervention de test
    testIntervention = interventionRepository.create({
      consumptionLevel: ConsumptionLevel.MEDIUM,
      notes: 'Test intervention notes',
      incidentType: IncidentType.NONE,
      baitReplaced: true,
      stationCleaned: true,
      agent: testUser,
      isSynchronized: true,
    });

    await interventionRepository.save(testIntervention);

    // Créer une photo de test
    testPhoto = photoRepository.create({
      filePath: 'uploads/test-photo.jpg',
      type: PhotoType.STATION,
      description: 'Test photo description',
      intervention: testIntervention,
      isSynchronized: true,
    });

    await photoRepository.save(testPhoto);

    // Générer un token JWT pour les tests
    const payload = { sub: testUser.id, email: testUser.email, role: testUser.role };
    authToken = jwtService.sign(payload);
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await photoRepository.delete(testPhoto.id);
    await interventionRepository.delete(testIntervention.id);
    await userRepository.delete(testUser.id);
    await app.close();
  });

  it('/photos (GET) - should return all photos', () => {
    return request(app.getHttpServer())
      .get('/photos')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.some(photo => photo.id === testPhoto.id)).toBe(true);
      });
  });

  it('/photos/:id (GET) - should return a specific photo', () => {
    return request(app.getHttpServer())
      .get(`/photos/${testPhoto.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testPhoto.id);
        expect(res.body.type).toBe(PhotoType.STATION);
        expect(res.body.description).toBe('Test photo description');
      });
  });

  it('/photos?interventionId=:interventionId (GET) - should return photos for a specific intervention', () => {
    return request(app.getHttpServer())
      .get(`/photos?interventionId=${testIntervention.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].id).toBe(testPhoto.id);
        expect(res.body[0].intervention.id).toBe(testIntervention.id);
      });
  });

  it('/photos/:id/sync (PATCH) - should mark a photo as synchronized', () => {
    return request(app.getHttpServer())
      .patch(`/photos/${testPhoto.id}/sync`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testPhoto.id);
        expect(res.body.isSynchronized).toBe(true);
      });
  });
});

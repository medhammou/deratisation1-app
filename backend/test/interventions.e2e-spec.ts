import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../src/entities/user.entity';
import { Site } from '../src/entities/site.entity';
import { Station, StationStatus } from '../src/entities/station.entity';
import { Intervention, ConsumptionLevel, IncidentType } from '../src/entities/intervention.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('InterventionsController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  let siteRepository: Repository<Site>;
  let stationRepository: Repository<Station>;
  let interventionRepository: Repository<Intervention>;
  let testUser: User;
  let testSite: Site;
  let testStation: Station;
  let testIntervention: Intervention;
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
    siteRepository = moduleFixture.get<Repository<Site>>(getRepositoryToken(Site));
    stationRepository = moduleFixture.get<Repository<Station>>(getRepositoryToken(Station));
    interventionRepository = moduleFixture.get<Repository<Intervention>>(getRepositoryToken(Intervention));

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

    // Créer un site de test
    testSite = siteRepository.create({
      name: 'Test Site',
      address: '123 Test Street',
      description: 'A test site for e2e testing',
      clientReference: 'TEST-001',
      isActive: true,
      client: testUser,
    });

    await siteRepository.save(testSite);

    // Créer une station de test
    testStation = stationRepository.create({
      identifier: 'STATION-001',
      location: {
        type: 'Point',
        coordinates: [2.3522, 48.8566], // Paris coordinates
      },
      description: 'Test station',
      status: StationStatus.ACTIVE,
      site: testSite,
    });

    await stationRepository.save(testStation);

    // Créer une intervention de test
    testIntervention = interventionRepository.create({
      consumptionLevel: ConsumptionLevel.MEDIUM,
      notes: 'Test intervention notes',
      incidentType: IncidentType.NONE,
      baitReplaced: true,
      stationCleaned: true,
      agent: testUser,
      station: testStation,
      isSynchronized: true,
    });

    await interventionRepository.save(testIntervention);

    // Générer un token JWT pour les tests
    const payload = { sub: testUser.id, email: testUser.email, role: testUser.role };
    authToken = jwtService.sign(payload);
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await interventionRepository.delete(testIntervention.id);
    await stationRepository.delete(testStation.id);
    await siteRepository.delete(testSite.id);
    await userRepository.delete(testUser.id);
    await app.close();
  });

  it('/interventions (GET) - should return all interventions', () => {
    return request(app.getHttpServer())
      .get('/interventions')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.some(intervention => intervention.id === testIntervention.id)).toBe(true);
      });
  });

  it('/interventions/:id (GET) - should return a specific intervention', () => {
    return request(app.getHttpServer())
      .get(`/interventions/${testIntervention.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testIntervention.id);
        expect(res.body.consumptionLevel).toBe(ConsumptionLevel.MEDIUM);
        expect(res.body.baitReplaced).toBe(true);
      });
  });

  it('/interventions?stationId=:stationId (GET) - should return interventions for a specific station', () => {
    return request(app.getHttpServer())
      .get(`/interventions?stationId=${testStation.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].id).toBe(testIntervention.id);
        expect(res.body[0].station.id).toBe(testStation.id);
      });
  });

  it('/interventions (POST) - should create a new intervention', () => {
    const newIntervention = {
      consumptionLevel: ConsumptionLevel.LOW,
      notes: 'New test intervention',
      incidentType: IncidentType.NONE,
      baitReplaced: false,
      stationCleaned: true,
      agent: { id: testUser.id },
      station: { id: testStation.id },
      isSynchronized: true,
    };

    return request(app.getHttpServer())
      .post('/interventions')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newIntervention)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.consumptionLevel).toBe(ConsumptionLevel.LOW);
        expect(res.body.notes).toBe('New test intervention');
        
        // Nettoyer après le test
        interventionRepository.delete(res.body.id);
      });
  });

  it('/interventions/:id (PATCH) - should update an intervention', () => {
    const updateData = {
      consumptionLevel: ConsumptionLevel.HIGH,
      notes: 'Updated notes',
    };

    return request(app.getHttpServer())
      .patch(`/interventions/${testIntervention.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testIntervention.id);
        expect(res.body.consumptionLevel).toBe(ConsumptionLevel.HIGH);
        expect(res.body.notes).toBe('Updated notes');
      });
  });

  it('/interventions/:id/sync (PATCH) - should mark an intervention as synchronized', () => {
    return request(app.getHttpServer())
      .patch(`/interventions/${testIntervention.id}/sync`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testIntervention.id);
        expect(res.body.isSynchronized).toBe(true);
      });
  });
});

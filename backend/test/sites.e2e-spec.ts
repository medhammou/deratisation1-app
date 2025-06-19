import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../src/entities/user.entity';
import { Site } from '../src/entities/site.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('SitesController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  let siteRepository: Repository<Site>;
  let testUser: User;
  let testSite: Site;
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

    // Générer un token JWT pour les tests
    const payload = { sub: testUser.id, email: testUser.email, role: testUser.role };
    authToken = jwtService.sign(payload);
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await siteRepository.delete(testSite.id);
    await userRepository.delete(testUser.id);
    await app.close();
  });

  it('/sites (GET) - should return all sites', () => {
    return request(app.getHttpServer())
      .get('/sites')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.some(site => site.name === 'Test Site')).toBe(true);
      });
  });

  it('/sites/:id (GET) - should return a specific site', () => {
    return request(app.getHttpServer())
      .get(`/sites/${testSite.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Site');
        expect(res.body.address).toBe('123 Test Street');
      });
  });

  it('/sites (POST) - should create a new site', () => {
    const newSite = {
      name: 'New Test Site',
      address: '456 New Street',
      description: 'A new test site',
      clientReference: 'TEST-002',
      isActive: true,
      client: { id: testUser.id },
    };

    return request(app.getHttpServer())
      .post('/sites')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSite)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Test Site');
        expect(res.body.address).toBe('456 New Street');
        
        // Nettoyer après le test
        siteRepository.delete(res.body.id);
      });
  });

  it('/sites/:id (PATCH) - should update a site', () => {
    const updateData = {
      name: 'Updated Test Site',
      description: 'Updated description',
    };

    return request(app.getHttpServer())
      .patch(`/sites/${testSite.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toBe(testSite.id);
        expect(res.body.name).toBe('Updated Test Site');
        expect(res.body.description).toBe('Updated description');
      });
  });
});

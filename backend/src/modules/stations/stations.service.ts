import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../../entities/station.entity';
import { Point } from 'geojson';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationsRepository: Repository<Station>,
  ) {}

  async findAll(): Promise<Station[]> {
    return this.stationsRepository.find({
      relations: ['site'],
    });
  }

  async findOne(id: string): Promise<Station> {
    const station = await this.stationsRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: ['site'],
    });
    if (!station) {
      // Check for null
      throw new NotFoundException(`Station with ID "${id}" not found.`);
    }
    return station; // Return the non-null station
  }

  async findBySite(siteId: string): Promise<Station[]> {
    return this.stationsRepository.find({
      where: { site: { id: siteId } },
      relations: ['site'],
    });
  }

  async create(stationData: Partial<Station>): Promise<Station> {
    const station = this.stationsRepository.create(stationData);
    return this.stationsRepository.save(station);
  }

  async update(id: string, stationData: Partial<Station>): Promise<Station> {
    await this.stationsRepository.update(id, stationData);
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.stationsRepository.delete(id); // Use delete directly
    if (result.affected === 0) {
      // Check if any row was affected
      throw new NotFoundException(`Station with ID "${id}" not found.`);
    }
  }

  async findWithInterventions(id: string): Promise<Station> {
    const station = await this.stationsRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: [
        'site',
        'interventions',
        'interventions.agent',
        'interventions.photos',
      ],
    });
    if (!station) {
      // Check for null
      throw new NotFoundException(`Station with ID "${id}" not found.`);
    }
    return station; // Return the non-null station
  }

  async findNearby(
    lat: number,
    lng: number,
    radiusInMeters: number = 500,
  ): Promise<Station[]> {
    // Utilisation de PostGIS pour trouver les stations à proximité
    const point: Point = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    return this.stationsRepository
      .createQueryBuilder('station')
      .innerJoinAndSelect('station.site', 'site')
      .where(
        `ST_DWithin(
        station.location::geography,
        ST_SetSRID(ST_GeomFromGeoJSON(:point), 4326)::geography,
        :radius
      )`,
      )
      .setParameters({
        point: JSON.stringify(point),
        radius: radiusInMeters,
      })
      .getMany();
  }
}

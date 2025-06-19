import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../../entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
  ) {}

  async findAll(): Promise<Site[]> {
    return this.sitesRepository.find({
      relations: ['client'],
    });
  }

  async findOne(id: string): Promise<Site> {
    const site = await this.sitesRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: ['client'],
    });
    if (!site) {
      // Check for null
      throw new NotFoundException(`Site with ID "${id}" not found.`);
    }
    return site; // Return the non-null site
  }

  async findByClient(clientId: string): Promise<Site[]> {
    return this.sitesRepository.find({
      where: { client: { id: clientId } },
      relations: ['client'],
    });
  }

  async create(siteData: Partial<Site>): Promise<Site> {
    const site = this.sitesRepository.create(siteData);
    return this.sitesRepository.save(site);
  }

  async update(id: string, siteData: Partial<Site>): Promise<Site> {
    await this.sitesRepository.update(id, siteData);
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sitesRepository.delete(id); // Use delete directly
    if (result.affected === 0) {
      // Check if any row was affected
      throw new NotFoundException(`Site with ID "${id}" not found.`);
    }
  }

  async findWithStations(): Promise<Site[]> {
    return this.sitesRepository.find({
      relations: ['client', 'stations'],
    });
  }

  async findOneWithStations(id: string): Promise<Site> {
    const site = await this.sitesRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: ['client', 'stations'],
    });
    if (!site) {
      // Check for null
      throw new NotFoundException(`Site with ID "${id}" not found.`);
    }
    return site; // Return the non-null site
  }
}

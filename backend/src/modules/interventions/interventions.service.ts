import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from '../../entities/intervention.entity';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>,
  ) {}

  async findAll(): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      relations: ['agent', 'station', 'station.site', 'photos'],
    });
  }

  async findOne(id: string): Promise<Intervention> {
    const intervention = await this.interventionsRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: ['agent', 'station', 'station.site', 'photos'],
    });
    if (!intervention) {
      // Check for null
      throw new NotFoundException(`Intervention with ID "${id}" not found.`);
    }
    return intervention; // Return the non-null intervention
  }

  async findByStation(stationId: string): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { station: { id: stationId } },
      relations: ['agent', 'station', 'photos'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByAgent(agentId: string): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { agent: { id: agentId } },
      relations: ['station', 'station.site', 'photos'],
      order: { createdAt: 'DESC' },
    });
  }

  async findBySite(siteId: string): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { station: { site: { id: siteId } } },
      relations: ['agent', 'station', 'photos'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(interventionData: Partial<Intervention>): Promise<Intervention> {
    const intervention = this.interventionsRepository.create(interventionData);
    return this.interventionsRepository.save(intervention);
  }

  async update(
    id: string,
    interventionData: Partial<Intervention>,
  ): Promise<Intervention> {
    await this.interventionsRepository.update(id, interventionData);
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.interventionsRepository.delete(id); // Use delete directly
    if (result.affected === 0) {
      // Check if any row was affected
      throw new NotFoundException(`Intervention with ID "${id}" not found.`);
    }
  }

  async findUnsynchronized(): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { isSynchronized: false },
      relations: ['agent', 'station', 'photos'],
    });
  }

  async markAsSynchronized(id: string): Promise<Intervention> {
    await this.interventionsRepository.update(id, { isSynchronized: true });
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator, In } from 'typeorm';
import { Intervention } from '../../entities/intervention.entity';
import { Photo } from '../../entities/photo.entity';
import { Site } from '../../entities/site.entity';
import { Station } from '../../entities/station.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>,
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
    @InjectRepository(Station)
    private stationsRepository: Repository<Station>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // Ajoutez d'autres dépôts si nécessaire
  ) {}

  /**
   * Exemple de méthode pour obtenir des photos non synchronisées
   * filtrées par des IDs d'interventions et une date.
   */
  async getUnsyncedPhotosByInterventionIds(
    interventionIds: string[],
    lastSyncTime: Date,
  ): Promise<Photo[]> {
    this.logger.debug(
      `Fetching unsynced photos for intervention IDs: ${interventionIds} since ${lastSyncTime}`,
    );
    return this.photosRepository.find({
      where: {
        isSynchronized: false,
        updatedAt: new FindOperator('moreThanOrEqual', lastSyncTime),
        intervention: {
          id: In(interventionIds),
        },
      },
      relations: ['intervention'],
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Méthode principale de synchronisation (anciennement synchronizeData, renommée syncData).
   * C'est cette méthode que votre contrôleur devrait appeler.
   * Vous devrez adapter cette méthode à votre logique de synchronisation réelle.
   */
  async syncData(
    lastSyncTime: Date,
    interventionsToSync: Partial<Intervention>[],
    photosToSync: Partial<Photo>[],
  ): Promise<any> {
    this.logger.log(`Starting data synchronization since ${lastSyncTime}`);

    const syncedInterventions: Intervention[] = [];
    const syncedPhotos: Photo[] = [];

    // --- Logique de synchronisation pour les interventions ---
    for (const interventionData of interventionsToSync) {
      try {
        // Créer ou trouver l'intervention
        let intervention = await this.interventionsRepository.findOne({
          where: { id: interventionData.id },
        });
        if (intervention) {
          // Mettre à jour l'intervention existante
          Object.assign(intervention, interventionData);
        } else {
          // Créer une nouvelle intervention
          intervention = this.interventionsRepository.create(interventionData);
        }
        const savedIntervention =
          await this.interventionsRepository.save(intervention);
        syncedInterventions.push(savedIntervention);
        await this.interventionsRepository.update(savedIntervention.id, {
          isSynchronized: true,
        });
      } catch (error) {
        this.logger.error(
          `Failed to sync intervention ${interventionData.id}: ${error.message}`,
        );
      }
    }

    // --- Logique de synchronisation pour les photos ---
    for (const photoData of photosToSync) {
      try {
        // Créer ou trouver la photo
        let photo = await this.photosRepository.findOne({
          where: { id: photoData.id },
        });
        if (photo) {
          // Mettre à jour la photo existante
          Object.assign(photo, photoData);
        } else {
          // Créer une nouvelle photo
          photo = this.photosRepository.create(photoData);
        }
        const savedPhoto = await this.photosRepository.save(photo);
        syncedPhotos.push(savedPhoto);
        await this.photosRepository.update(savedPhoto.id, {
          isSynchronized: true,
        });
      } catch (error) {
        this.logger.error(
          `Failed to sync photo ${photoData.id}: ${error.message}`,
        );
      }
    }

    this.logger.log(
      `Synchronization complete. ${syncedInterventions.length} interventions and ${syncedPhotos.length} photos synced.`,
    );

    return {
      interventionsSynced: syncedInterventions.length,
      photosSynced: syncedPhotos.length,
    };
  }

  // Ajoutez ici d'autres méthodes de votre service de synchronisation si nécessaire
  async getUnsynchronizedInterventions(): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { isSynchronized: false },
      relations: ['agent', 'station', 'photos'],
    });
  }

  async getUnsynchronizedPhotos(): Promise<Photo[]> {
    return this.photosRepository.find({
      where: { isSynchronized: false },
      relations: ['intervention'],
    });
  }

  async handleIncomingSync(data: {
    interventions: Partial<Intervention>[];
    photos: Partial<Photo>[];
  }): Promise<any> {
    this.logger.log('Handling incoming sync data...');
    const savedInterventions = await this.interventionsRepository.save(
      data.interventions,
    );
    const savedPhotos = await this.photosRepository.save(data.photos);
    this.logger.log(
      `Incoming sync complete: ${savedInterventions.length} interventions, ${savedPhotos.length} photos saved.`,
    );
    return {
      success: true,
      interventions: savedInterventions.length,
      photos: savedPhotos.length,
    };
  }
}

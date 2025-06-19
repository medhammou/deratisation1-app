import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../../entities/photo.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photosRepository.find({
      relations: ['intervention'],
    });
  }

  async findOne(id: string): Promise<Photo> {
    const photo = await this.photosRepository.findOne({
      // Assign to a variable
      where: { id },
      relations: ['intervention'],
    });
    if (!photo) {
      // Check for null
      throw new NotFoundException(`Photo with ID "${id}" not found.`);
    }
    return photo; // Return the non-null photo
  }

  async findByIntervention(interventionId: string): Promise<Photo[]> {
    return this.photosRepository.find({
      where: { intervention: { id: interventionId } },
      relations: ['intervention'],
    });
  }

  async create(
    photoData: Partial<Photo>,
    file?: Express.Multer.File,
  ): Promise<Photo> {
    const photo = this.photosRepository.create(photoData);

    if (file) {
      // Générer un nom de fichier unique
      const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      const uploadDir = path.join(process.cwd(), 'uploads');

      // Créer le répertoire s'il n'existe pas
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Chemin complet du fichier
      const filePath = path.join(uploadDir, uniqueFilename);

      // Écrire le fichier
      fs.writeFileSync(filePath, file.buffer);

      // Mettre à jour le chemin du fichier dans l'entité
      photo.filePath = `uploads/${uniqueFilename}`;

      // Générer une miniature (à implémenter)
      // photo.thumbnailPath = await this.generateThumbnail(filePath);
    }

    return this.photosRepository.save(photo);
  }

  async update(id: string, photoData: Partial<Photo>): Promise<Photo> {
    await this.photosRepository.update(id, photoData);
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const photo = await this.photosRepository.findOne({ where: { id } }); // Find photo to get its paths

    if (!photo) {
      // Check if photo was found before attempting to remove
      throw new NotFoundException(`Photo with ID "${id}" not found.`);
    }

    // Supprimer le fichier physique si nécessaire
    if (photo.filePath) {
      const filePath = path.join(process.cwd(), photo.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Supprimer la miniature si elle existe
    if (photo.thumbnailPath) {
      const thumbnailPath = path.join(process.cwd(), photo.thumbnailPath);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    await this.photosRepository.delete(id);
  }

  async findUnsynchronized(): Promise<Photo[]> {
    return this.photosRepository.find({
      where: { isSynchronized: false },
      relations: ['intervention'],
    });
  }

  async markAsSynchronized(id: string): Promise<Photo> {
    await this.photosRepository.update(id, { isSynchronized: true });
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }
}

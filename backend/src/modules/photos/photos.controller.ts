import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from '../../entities/photo.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('photos')
@Controller('photos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  @ApiResponse({ status: 200, description: 'Return all photos', type: [Photo] })
  @ApiQuery({ name: 'interventionId', required: false, description: 'Filter photos by intervention ID' })
  async findAll(
    @Query('interventionId') interventionId?: string,
  ): Promise<Photo[]> {
    if (interventionId) {
      return this.photosService.findByIntervention(interventionId);
    }
    
    return this.photosService.findAll();
  }

  @Get('unsynchronized')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Get all unsynchronized photos' })
  @ApiResponse({ status: 200, description: 'Return all unsynchronized photos', type: [Photo] })
  findUnsynchronized(): Promise<Photo[]> {
    return this.photosService.findUnsynchronized();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a photo by id' })
  @ApiResponse({ status: 200, description: 'Return the photo', type: Photo })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  findOne(@Param('id') id: string): Promise<Photo> {
    return this.photosService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        type: {
          type: 'string',
          enum: ['station', 'incident', 'consumption', 'other'],
        },
        description: {
          type: 'string',
        },
        interventionId: {
          type: 'string',
        },
        isSynchronized: {
          type: 'boolean',
        },
        localCreatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new photo' })
  @ApiResponse({ status: 201, description: 'The photo has been created', type: Photo })
  create(
    @Body() photoData: Partial<Photo>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Photo> {
    return this.photosService.create(photoData, file);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a photo' })
  @ApiResponse({ status: 200, description: 'The photo has been updated', type: Photo })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  update(@Param('id') id: string, @Body() photoData: Partial<Photo>): Promise<Photo> {
    return this.photosService.update(id, photoData);
  }

  @Patch(':id/sync')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT)
  @ApiOperation({ summary: 'Mark a photo as synchronized' })
  @ApiResponse({ status: 200, description: 'The photo has been marked as synchronized', type: Photo })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  markAsSynchronized(@Param('id') id: string): Promise<Photo> {
    return this.photosService.markAsSynchronized(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Delete a photo' })
  @ApiResponse({ status: 200, description: 'The photo has been deleted' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.photosService.remove(id);
  }
}

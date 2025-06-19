// src/modules/sync/sync.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get, // <-- THIS IS THE MISSING IMPORT FOR @Get() DECORATOR
} from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ensure correct path
import { RolesGuard } from '../auth/guards/roles.guard'; // Ensure correct path
import { Roles } from '../auth/decorators/roles.decorator'; // Ensure correct path
import { Role } from '../../enums/role.enum'; // <-- Ensure correct path for your Role enum

// --- SUGGESTION: Create this DTO (Data Transfer Object) for better type safety and validation ---
// You would typically create this in a file like: src/modules/sync/dto/sync-payload.dto.ts
//
// import { PartialType } from '@nestjs/mapped-types'; // You might need this if using PartialType
// import { Intervention } from '../../entities/intervention.entity'; // Adjust path
// import { Photo } from '../../entities/photo.entity';           // Adjust path
//
// export class SyncPayloadDto {
//   lastSyncTime: Date; // This will likely be sent as a string and converted in the controller
//   interventions: Partial<Intervention>[];
//   photos: Partial<Photo>[];
//   // If you had a 4th argument in the previous error, it was likely an extra property here.
// }
// ------------------------------------------------------------------------------------------------

@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards to the entire controller
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('/')
  @Roles(Role.ADMIN, Role.AGENT) // Example: Only ADMIN and AGENT roles can perform this sync
  @HttpCode(HttpStatus.OK)
  // Use 'any' for the payload type if you haven't created SyncPayloadDto yet.
  // Replace 'any' with 'SyncPayloadDto' once you've created and imported it.
  async sync(@Body() syncPayload: any) {
    const { lastSyncTime, interventions, photos } = syncPayload;

    // This is where the "Expected 3 arguments, but got 4" error was resolved in the last step.
    // We ensure only the three expected arguments are passed to syncService.syncData().
    return this.syncService.syncData(
      new Date(lastSyncTime), // Convert lastSyncTime to a Date object as expected by the service
      interventions,
      photos,
      // Ensure there are NO other arguments passed here.
      // E.g., if you had `syncPayload.someExtraField`, remove it.
    );
  }

  @Get('/unsynced/interventions') // <-- @Get() decorator is now imported
  @Roles(Role.AGENT) // Example: Only AGENT role can request unsynced interventions
  async getUnsynchronizedInterventions() {
    return this.syncService.getUnsynchronizedInterventions();
  }

  @Get('/unsynced/photos') // <-- @Get() decorator is now imported
  @Roles(Role.AGENT)
  async getUnsynchronizedPhotos() {
    return this.syncService.getUnsynchronizedPhotos();
  }
}

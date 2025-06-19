import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { Station } from '../../entities/station.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('stations')
@Controller('stations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stations' })
  @ApiResponse({ status: 200, description: 'Return all stations', type: [Station] })
  @ApiQuery({ name: 'siteId', required: false, description: 'Filter stations by site ID' })
  @ApiQuery({ name: 'lat', required: false, type: Number, description: 'Latitude for proximity search' })
  @ApiQuery({ name: 'lng', required: false, type: Number, description: 'Longitude for proximity search' })
  @ApiQuery({ name: 'radius', required: false, type: Number, description: 'Radius in meters for proximity search' })
  async findAll(
    @Query('siteId') siteId?: string,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radius') radius?: number,
  ): Promise<Station[]> {
    if (siteId) {
      return this.stationsService.findBySite(siteId);
    }
    
    if (lat && lng) {
      return this.stationsService.findNearby(lat, lng, radius);
    }
    
    return this.stationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a station by id' })
  @ApiResponse({ status: 200, description: 'Return the station', type: Station })
  @ApiResponse({ status: 404, description: 'Station not found' })
  @ApiQuery({ name: 'includeInterventions', required: false, type: Boolean, description: 'Include interventions in response' })
  findOne(
    @Param('id') id: string,
    @Query('includeInterventions') includeInterventions?: boolean,
  ): Promise<Station> {
    if (includeInterventions === true) {
      return this.stationsService.findWithInterventions(id);
    }
    
    return this.stationsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Create a new station' })
  @ApiResponse({ status: 201, description: 'The station has been created', type: Station })
  create(@Body() stationData: Partial<Station>): Promise<Station> {
    return this.stationsService.create(stationData);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT)
  @ApiOperation({ summary: 'Update a station' })
  @ApiResponse({ status: 200, description: 'The station has been updated', type: Station })
  @ApiResponse({ status: 404, description: 'Station not found' })
  update(@Param('id') id: string, @Body() stationData: Partial<Station>): Promise<Station> {
    return this.stationsService.update(id, stationData);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Delete a station' })
  @ApiResponse({ status: 200, description: 'The station has been deleted' })
  @ApiResponse({ status: 404, description: 'Station not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.stationsService.remove(id);
  }
}

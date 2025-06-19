import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SitesService } from './sites.service';
import { Site } from '../../entities/site.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('sites')
@Controller('sites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sites' })
  @ApiResponse({ status: 200, description: 'Return all sites', type: [Site] })
  @ApiQuery({ name: 'clientId', required: false, description: 'Filter sites by client ID' })
  @ApiQuery({ name: 'includeStations', required: false, type: Boolean, description: 'Include stations in response' })
  async findAll(
    @Query('clientId') clientId?: string,
    @Query('includeStations') includeStations?: boolean,
  ): Promise<Site[]> {
    if (includeStations === true) {
      return this.sitesService.findWithStations();
    }
    
    if (clientId) {
      return this.sitesService.findByClient(clientId);
    }
    
    return this.sitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a site by id' })
  @ApiResponse({ status: 200, description: 'Return the site', type: Site })
  @ApiResponse({ status: 404, description: 'Site not found' })
  @ApiQuery({ name: 'includeStations', required: false, type: Boolean, description: 'Include stations in response' })
  findOne(
    @Param('id') id: string,
    @Query('includeStations') includeStations?: boolean,
  ): Promise<Site> {
    if (includeStations === true) {
      return this.sitesService.findOneWithStations(id);
    }
    
    return this.sitesService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Create a new site' })
  @ApiResponse({ status: 201, description: 'The site has been created', type: Site })
  create(@Body() siteData: Partial<Site>): Promise<Site> {
    return this.sitesService.create(siteData);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Update a site' })
  @ApiResponse({ status: 200, description: 'The site has been updated', type: Site })
  @ApiResponse({ status: 404, description: 'Site not found' })
  update(@Param('id') id: string, @Body() siteData: Partial<Site>): Promise<Site> {
    return this.sitesService.update(id, siteData);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a site' })
  @ApiResponse({ status: 200, description: 'The site has been deleted' })
  @ApiResponse({ status: 404, description: 'Site not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.sitesService.remove(id);
  }
}

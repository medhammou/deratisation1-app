import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { Intervention } from '../../entities/intervention.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('interventions')
@Controller('interventions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all interventions' })
  @ApiResponse({ status: 200, description: 'Return all interventions', type: [Intervention] })
  @ApiQuery({ name: 'stationId', required: false, description: 'Filter interventions by station ID' })
  @ApiQuery({ name: 'agentId', required: false, description: 'Filter interventions by agent ID' })
  @ApiQuery({ name: 'siteId', required: false, description: 'Filter interventions by site ID' })
  async findAll(
    @Query('stationId') stationId?: string,
    @Query('agentId') agentId?: string,
    @Query('siteId') siteId?: string,
  ): Promise<Intervention[]> {
    if (stationId) {
      return this.interventionsService.findByStation(stationId);
    }
    
    if (agentId) {
      return this.interventionsService.findByAgent(agentId);
    }
    
    if (siteId) {
      return this.interventionsService.findBySite(siteId);
    }
    
    return this.interventionsService.findAll();
  }

  @Get('unsynchronized')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Get all unsynchronized interventions' })
  @ApiResponse({ status: 200, description: 'Return all unsynchronized interventions', type: [Intervention] })
  findUnsynchronized(): Promise<Intervention[]> {
    return this.interventionsService.findUnsynchronized();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an intervention by id' })
  @ApiResponse({ status: 200, description: 'Return the intervention', type: Intervention })
  @ApiResponse({ status: 404, description: 'Intervention not found' })
  findOne(@Param('id') id: string): Promise<Intervention> {
    return this.interventionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new intervention' })
  @ApiResponse({ status: 201, description: 'The intervention has been created', type: Intervention })
  create(@Body() interventionData: Partial<Intervention>): Promise<Intervention> {
    return this.interventionsService.create(interventionData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an intervention' })
  @ApiResponse({ status: 200, description: 'The intervention has been updated', type: Intervention })
  @ApiResponse({ status: 404, description: 'Intervention not found' })
  update(@Param('id') id: string, @Body() interventionData: Partial<Intervention>): Promise<Intervention> {
    return this.interventionsService.update(id, interventionData);
  }

  @Patch(':id/sync')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.AGENT)
  @ApiOperation({ summary: 'Mark an intervention as synchronized' })
  @ApiResponse({ status: 200, description: 'The intervention has been marked as synchronized', type: Intervention })
  @ApiResponse({ status: 404, description: 'Intervention not found' })
  markAsSynchronized(@Param('id') id: string): Promise<Intervention> {
    return this.interventionsService.markAsSynchronized(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @ApiOperation({ summary: 'Delete an intervention' })
  @ApiResponse({ status: 200, description: 'The intervention has been deleted' })
  @ApiResponse({ status: 404, description: 'Intervention not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.interventionsService.remove(id);
  }
}

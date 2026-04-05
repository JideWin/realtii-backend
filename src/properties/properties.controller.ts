import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('properties')
@UseGuards(AuthGuard('jwt')) // THE LOCK: No token, no entry!
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Req() req: any) {
    // SECURITY OVERRIDE: 
    // We ignore whatever tenant_id the frontend sent, and overwrite it 
    // with the cryptographic tenantId extracted from the verified token!
    createPropertyDto.tenant_id = req.user.tenantId;
    
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }
}
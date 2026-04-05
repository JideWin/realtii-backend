import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertiesRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const newProperty = this.propertiesRepository.create({
      title: createPropertyDto.title,
      description: createPropertyDto.description,
      boundary: createPropertyDto.boundary,
      tenant: { id: createPropertyDto.tenant_id } // The Relational Security Link!
    });
    return await this.propertiesRepository.save(newProperty);
  }

  async findAll(): Promise<Property[]> {
    // This will return the properties WITH their State data attached
    return await this.propertiesRepository.find({
      relations: ['tenant'], 
    });
  }

  findOne(id: number) { return `This action returns a #${id} property`; }
  update(id: number, updatePropertyDto: any) { return `This action updates a #${id} property`; }
  remove(id: number) { return `This action removes a #${id} property`; }
}
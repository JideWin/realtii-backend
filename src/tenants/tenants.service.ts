import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  // 1. We inject the Neon database connection for this specific table
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // 1. Prepare the new row for the database
    const newTenant = this.tenantsRepository.create(createTenantDto);
    // 2. Save it to Neon and return the confirmed result
    return await this.tenantsRepository.save(newTenant);
  }

  // 2. We change this from a string to a real database query!
  async findAll(): Promise<Tenant[]> {
    return await this.tenantsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
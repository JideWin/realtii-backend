import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHubUserDto } from './dto/create-hub-user.dto';
import { UpdateHubUserDto } from './dto/update-hub-user.dto';
import { HubUser } from './entities/hub-user.entity';

@Injectable()
export class HubUsersService {
  constructor(
    @InjectRepository(HubUser)
    private readonly hubUsersRepository: Repository<HubUser>,
  ) {}

  async create(createHubUserDto: CreateHubUserDto): Promise<HubUser> {
    // We map the incoming tenant_id directly to the relational object
    const newUser = this.hubUsersRepository.create({
      ...createHubUserDto,
      tenant: { id: createHubUserDto.tenant_id } 
    });
    return await this.hubUsersRepository.save(newUser);
  }

  async findAll(): Promise<HubUser[]> {
    // We use "relations" so the API returns the user AND their assigned State
    return await this.hubUsersRepository.find({
      relations: ['tenant'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} hubUser`;
  }

  update(id: number, updateHubUserDto: UpdateHubUserDto) {
    return `This action updates a #${id} hubUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} hubUser`;
  }
}
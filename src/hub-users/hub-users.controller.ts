import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HubUsersService } from './hub-users.service';
import { CreateHubUserDto } from './dto/create-hub-user.dto';
import { UpdateHubUserDto } from './dto/update-hub-user.dto';

@Controller('hub-users')
export class HubUsersController {
  constructor(private readonly hubUsersService: HubUsersService) {}

  @Post()
  create(@Body() createHubUserDto: CreateHubUserDto) {
    return this.hubUsersService.create(createHubUserDto);
  }

  @Get()
  findAll() {
    return this.hubUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hubUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHubUserDto: UpdateHubUserDto) {
    return this.hubUsersService.update(+id, updateHubUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubUsersService.remove(+id);
  }
}

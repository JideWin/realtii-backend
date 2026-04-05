import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubUsersService } from './hub-users.service';
import { HubUsersController } from './hub-users.controller';
import { HubUser } from './entities/hub-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HubUser])], // Injects the hub_users table!
  controllers: [HubUsersController],
  providers: [HubUsersService],
})
export class HubUsersModule {}
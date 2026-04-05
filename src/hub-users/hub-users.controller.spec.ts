import { Test, TestingModule } from '@nestjs/testing';
import { HubUsersController } from './hub-users.controller';
import { HubUsersService } from './hub-users.service';

describe('HubUsersController', () => {
  let controller: HubUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HubUsersController],
      providers: [HubUsersService],
    }).compile();

    controller = module.get<HubUsersController>(HubUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

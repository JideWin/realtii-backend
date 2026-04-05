import { Test, TestingModule } from '@nestjs/testing';
import { HubUsersService } from './hub-users.service';

describe('HubUsersService', () => {
  let service: HubUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubUsersService],
    }).compile();

    service = module.get<HubUsersService>(HubUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

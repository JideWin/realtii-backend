import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HubUser } from '../hub-users/entities/hub-user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(HubUser)
    private hubUsersRepository: Repository<HubUser>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Find the user AND their assigned State
    const user = await this.hubUsersRepository.findOne({
      where: { email: loginDto.email },
      relations: ['tenant'], // CRITICAL: We need the State data to hide in the token!
    });

    // 2. Verify Password 
    // (Note: For our manual MVP test, we are checking the raw string. In production, we use bcrypt.compare here!)
    if (!user || user.password_hash !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Forge the JWT Payload (The data hidden inside the token)
    const payload = {
      sub: user.id, // The User ID
      email: user.email,
      role: user.role,
      tenant_id: user.tenant.id, // The secret Row-Level Security link!
      tenant_code: user.tenant.tenant_code,
    };

    // 4. Sign the token and send it back to the user
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        first_name: user.first_name,
        role: user.role,
        state: user.tenant.state_name
      }
    };
  }
}
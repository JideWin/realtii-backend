import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HubUsersModule } from '../hub-users/hub-users.module'; // Import the users module
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubUser } from '../hub-users/entities/hub-user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    HubUsersModule,
    PassportModule,
    TypeOrmModule.forFeature([HubUser]), // Give Auth access to the Users table
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' }, // Tokens expire after a standard 8-hour workday
      }),
    }),
  ],
 providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
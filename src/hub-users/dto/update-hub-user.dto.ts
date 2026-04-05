import { PartialType } from '@nestjs/mapped-types';
import { CreateHubUserDto } from './create-hub-user.dto';

export class UpdateHubUserDto extends PartialType(CreateHubUserDto) {}

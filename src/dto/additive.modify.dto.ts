import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users/users.schema';
export class AdditiveModifyDto extends PickType(User, [
  'email',
  'allergyAdditive',
] as const) {}

import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users/users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
] as const) {
  @ApiProperty({
    example: '32099',
    description: 'id',
  })
  id: string;
}

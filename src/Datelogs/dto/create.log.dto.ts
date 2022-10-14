import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Logs } from '../date.logs.schema';
export class LogsRequestDto extends PickType(Logs, [
  //'Date',
  'AdditiveLogs',
  'Comment',
  'Rating',
] as const) {}

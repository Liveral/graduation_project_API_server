import { forwardRef, Module } from '@nestjs/common';
import { LogsService } from './date.logs.service';
import { LogsController } from './date.logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from './date.logs.schema';
import { UsersModule } from 'src/users/users.module';
import { LogsRepository } from './date.logs.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Logs.name,
        schema: LogsSchema,
      },
    ]),
  ],
  controllers: [LogsController],
  providers: [LogsService, LogsRepository],
})
export class LogsModule {}

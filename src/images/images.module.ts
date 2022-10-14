import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { AdditiveRepository } from './images.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    //AdditiveRepository,
  ],
  providers: [ImagesService, AwsService, AdditiveRepository],
  controllers: [ImagesController],
})
export class ImagesModule {}

import {
  Controller,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { CurrentUser } from 'src/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ImagesService } from './images.service';
import { UserIntercepter } from 'src/common/interceptors/user.interceptor';
import { AwsService } from './aws.service';
@Controller('images')
@UseInterceptors(UserIntercepter)
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly awsService: AwsService,
  ) {}

  @ApiOperation({ summary: '파일업로드' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImg(@UploadedFile() file: Express.Multer.File) {
    //return await this.imagesService.getTextFromImage(files);
    //console.log(file);
    //return await this.awsService.uploadFileToS3('image', file);
    const keys = await this.awsService.uploadFileToS3('image', file);
    const path = this.awsService.getAwsS3FileUrl(keys.key);
    console.log(path);
    return await this.imagesService.getTextFromAws(path);
  }
}

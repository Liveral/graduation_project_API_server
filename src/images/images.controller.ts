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
//@UseInterceptors(UserIntercepter)
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly awsService: AwsService,
  ) {}

  //https://www.fun25.co.kr/blog/flutter-http-post-example/?category=003
  //https://archijude.tistory.com/358
  @ApiOperation({ summary: '파일업로드' })
  @Post('upload')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('Image')))
  async uploadImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    //console.log(files);
    return await this.imagesService.getTextFromImage(files);
  }

  @ApiOperation({ summary: 'aws S3 파일업로드' })
  @Post('upload/aws')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('Image')))
  async uploadToS3(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.awsService.uploadFileToS3('image', files[0]);
  }
}

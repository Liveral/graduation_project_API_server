import {
  Controller,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { CurrentUser } from 'src/decorator/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ImagesService } from './images.service';
import { UserIntercepter } from 'src/common/interceptors/user.interceptor';
@Controller('images')
@UseInterceptors(UserIntercepter)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: '파일업로드' })
  @Post('upload')
  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('Image')))
  async uploadImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    //@CurrentUser() user,
  ) {
    return await this.imagesService.getTextFromImage(files);
    //console.log(files[0]);
    //return `${files[0]} is posted`;
  }
}

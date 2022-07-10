import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserIntercepter } from 'src/common/interceptors/user.interceptor';
import { UsersService } from './users.service';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/LoginRequestDto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/decorator/CurrentUser.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { User } from './users.schema';
@Controller('user')
@UseInterceptors(UserIntercepter)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 로그인한 유저 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return await this.userService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Get('login')
  async logIn(@Body() data: LoginRequestDto) {
    return await this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '알러기 성분 설정' })
  @Post('allergy')
  setAllergyIngredients(@Body() data) {
    return `${data} is posted`;
  }

  @ApiOperation({ summary: '선호 성분 설정' })
  @Post('ingrediets')
  setPreferIngredients(@Body() data) {
    return `${data} is posted`;
  }
}

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
import { AdditiveModifyDto } from 'src/dto/additive.modify.dto';
import { PreferAdditiveDto } from 'src/dto/prefer.additive.modify.dto';
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
  @Post('login')
  async logIn(@Body() data: LoginRequestDto) {
    return await this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '알러기 성분 설정' })
  @UseGuards(JwtAuthGuard)
  @Post('allergy')
  setAllergyAdditive(
    @CurrentUser() user: User,
    //@Body() data: AdditiveModifyDto,
    @Body() data: any,
  ) {
    console.log(data);
    const newData = {
      email: user.email,
      allergyAdditive: data.allergyAdditive,
    };
    console.log(newData);
    return this.userService.setAllergy(newData);
  }

  @ApiOperation({ summary: '선호 성분 설정' })
  @UseGuards(JwtAuthGuard)
  @Post('prefer')
  setPreferAdditive(
    @CurrentUser() user: User,
    @Body() data: PreferAdditiveDto,
  ) {
    console.log(data);
    return this.userService.setPrefer(data);
  }
}

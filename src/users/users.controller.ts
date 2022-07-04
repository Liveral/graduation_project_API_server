import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserIntercepter } from 'src/common/interceptors/user.interceptor';
import { UsersService } from './users.service';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/LoginRequestDto';
@Controller('user')
@UseInterceptors(UserIntercepter)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 로그인한 유저 정보 가져오기' })
  //@UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(/*@CurrentUser() user*/) {
    //@Req() req: Request
    //return '현재 로그인한 유저 정보';
    //return userService.getCurrentCat;
    return this.userService.getAllUser();
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    //type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return await this.userService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
}

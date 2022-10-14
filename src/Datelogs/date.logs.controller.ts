import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LogsService } from './date.logs.service';
import { ApiOperation } from '@nestjs/swagger';
import { LogsRequestDto } from './dto/create.log.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/decorator/CurrentUser.decorator';
import { User } from 'src/users/users.schema';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @ApiOperation({
    summary: '해당 날짜에 로그 남기기',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createLogs(
    @CurrentUser() user: User,
    @Body() createLogDto: LogsRequestDto,
  ) {
    return this.logsService.createLogs(user.id, createLogDto);
    //console.log(createLogDto);
    //return 'success';
  }

  @ApiOperation({
    summary: '로그 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getLogs(@CurrentUser() user: User) {
    return this.logsService.getLogs(user.id);
  }
}

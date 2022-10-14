import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { UserRepository } from 'src/users/users.repository';
import { LogsRequestDto } from './dto/create.log.dto';
import { LogsRepository } from './date.logs.repository';
import { Logs } from './date.logs.schema';

@Injectable()
export class LogsService {
  constructor(private readonly logsRepository: LogsRepository) {}

  async createLogs(id: string, createLogDto: LogsRequestDto) {
    /*
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    console.log(year, month, today, hours, minutes, seconds, milliseconds);
    const DateArr = [
      year,
      month,
      today + 1,
      hours,
      minutes,
      seconds,
      milliseconds,
    ];
    */
    return await this.logsRepository.create(createLogDto, id);
  }

  async getLogs(id: string | Types.ObjectId) {
    return await this.logsRepository.getLogs(id);
  }
}

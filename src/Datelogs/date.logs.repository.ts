import * as mongoose from 'mongoose';
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userInfo } from 'os';
import { Logs } from './date.logs.schema';
import { LogsRequestDto } from './dto/create.log.dto';
@Injectable()
export class LogsRepository {
  constructor(
    @InjectModel(Logs.name) private readonly LogsModel: Model<Logs>,
  ) {}

  async create(date: number[], createLogDto: LogsRequestDto, id: string) {
    try {
      const { AdditiveLogs } = createLogDto;
      const newLogs = new this.LogsModel({
        User_id: id,
        Date: date,
        AdditiveLogs,
      });
      return await newLogs.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getLogs(id: string | Types.ObjectId) {
    const Logs = await this.LogsModel.find({ User_id: id });
    //console.log(Logs);
    return Logs;
  }
}

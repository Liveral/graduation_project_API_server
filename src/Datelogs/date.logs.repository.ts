import * as mongoose from 'mongoose';
import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userInfo } from 'os';
import { Logs } from './date.logs.schema';
import { LogsRequestDto } from './dto/create.log.dto';
import { stringify } from 'querystring';
@Injectable()
export class LogsRepository {
  constructor(
    @InjectModel(Logs.name) private readonly LogsModel: Model<Logs>,
  ) {}

  async create(createLogDto: LogsRequestDto, id: string) {
    try {
      const { AdditiveLogs, Comment, Rating } = createLogDto;
      const newLogs = new this.LogsModel({
        User_id: id,
        AdditiveLogs,
        Comment,
        Rating,
      });
      return await newLogs.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  /*
  
  async findUserById(userId: string | Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
  
  */
  //npm run start:dev
  //npm run build
  async getLogs(id: string | Types.ObjectId) {
    const LogsData = await this.LogsModel.find({ User_id: id });
    /*
      .select('-User_id')0
      .select('-_id')
      .select('-updatedAt');
    */
    console.log(Logs);
    var LogArr = [];
    LogsData.forEach((data) => {
      var Log = {};
      Log['AdditiveLogs'] = data['AdditiveLogs'];
      Log['Comment'] = data['Comment'];
      Log['Rating'] = data['Rating'];
      var date = String(data['createdAt']);
      //console.log(typeof date);
      //console.log(String(date));
      var month = date.slice(4, 7);
      var day = date.slice(8, 10);
      if (month == 'Jan') {
        month = '01';
      } else if (month == 'Feb') {
        month = '02';
      } else if (month == 'Mar') {
        month = '03';
      } else if (month == 'Apr') {
        month = '04';
      } else if (month == 'May') {
        month = '05';
      } else if (month == 'Jun') {
        month = '06';
      } else if (month == 'Jul') {
        month = '07';
      } else if (month == 'Aug') {
        day = '08';
      } else if (month == 'Sep') {
        month = '09';
      } else if (month == 'Oct') {
        month = '10';
      } else if (month == 'Nov') {
        month = '11';
      } else if (month == 'Dec') {
        month = '12';
      }
      var year = date.slice(11, 15);
      date = year + '-' + month + '-' + day;
      //console.log(date);
      Log['date'] = date;

      LogArr.push(Log);
    });
    //console.log(LogArr);
    return LogArr;
  }
}

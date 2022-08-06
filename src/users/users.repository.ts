import * as mongoose from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { Model, Types } from 'mongoose';
import { userInfo } from 'os';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, //@InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(requestedUser: UserRequestDto): Promise<User> {
    const createdUser = new this.userModel(requestedUser);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(userId: string | Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  async existEmail(email: string): Promise<boolean> {
    try {
      const result = await this.userModel.exists({ email });
      if (result) return true;
      else return false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async updateAllergyAdditive(
    email: string,
    contents: string[],
  ): Promise<User | null> {
    await this.userModel.updateOne(
      {
        email: email,
      },
      {
        allergyAdditive: contents,
      },
    );
    const user = this.userModel.findOne({ email });
    return user;
  }

  async updatePreferAdditive(
    email: string,
    contents: string[],
  ): Promise<User | null> {
    await this.userModel.updateOne(
      {
        email: email,
      },
      {
        preferAdditive: contents,
      },
    );
    const user = this.userModel.findOne({ email });
    return user;
  }
}

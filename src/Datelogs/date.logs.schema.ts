import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Logs extends Document {
  @ApiProperty({
    description: '유저 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  User_id: Types.ObjectId;

  @ApiProperty({
    example: '[호두, 땅콩, 구연산]',
    description: 'Food Additive Log',
  })
  @Prop()
  @IsArray()
  AdditiveLogs: string[];

  @ApiProperty({
    example: '[comments]',
    description: 'Food Additive comment',
  })
  @Prop()
  @IsString()
  Comment: string;

  @ApiProperty({
    example: 'rating',
    description: 'Food Additive rating',
  })
  @Prop()
  @IsNumber()
  Rating: Number;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);

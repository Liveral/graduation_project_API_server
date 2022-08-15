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
  /*
  @ApiProperty({
    description: 'year',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'month',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  month: number;

  @ApiProperty({
    description: 'day',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  day: number;

  @ApiProperty({
    description: 'hour',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  hours: Number;

  @ApiProperty({
    description: 'minute',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  minutes: number;

  @ApiProperty({
    description: 'second',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  seconds: string;

  @ApiProperty({
    description: 'second',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  milliseconds: string;
  */
  @ApiProperty({
    example: '[년, 월, 일, 시, 분, 초, 밀리세컨드]',
    description: '로그 시간',
  })
  @Prop()
  @IsArray()
  Date: number[];

  @ApiProperty({
    example: '[호두, 땅콩, 구연산]',
    description: 'Food Additive Log',
  })
  @Prop()
  @IsArray()
  AdditiveLogs: string[];
}

export const LogsSchema = SchemaFactory.createForClass(Logs);

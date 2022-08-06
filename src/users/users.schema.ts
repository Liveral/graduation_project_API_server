import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
const options: SchemaOptions = {
  timestamps: true, //db에서 만들어질 때마다 timestamp 찍는다
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'hongyoubin@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '홍유빈',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12453',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '[호두, 땅콩, 구연산]',
    description: 'prefer Food Additive',
  })
  @Prop()
  @IsArray()
  preferAdditive: string[];

  @ApiProperty({
    example: '[호두, 땅콩, 구연산]',
    description: 'allgergy Food Additive',
  })
  @Prop()
  @IsArray()
  allergyAdditive: string[];

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    preferAdditive: string[];
    allergyAdditive: string[];
  };
}

const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    preferAdditive: this.preferAdditive,
    allergyAdditive: this.allergyAdditive,
  };
});

export const UserSchema = _UserSchema;

import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAllUser() {
    const allUser = await this.userRepository.findAll();
    const readOnlyUsers = allUser.map((user) => user.readOnlyData);
    return readOnlyUsers;
  }

  async signUp(body: UserRequestDto) {
    const { email, name, password } = body;
    const isUserExist = await this.userRepository.existEmail(email);
    if (isUserExist) {
      throw new HttpException('해당하는 유저는 이미 존재합니다.', 403);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return user.readOnlyData;
  }

  async setAllergy(body) {}
}

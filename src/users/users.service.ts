import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { AdditiveModifyDto } from 'src/dto/additive.modify.dto';
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

  // repository와 연결
  async setAllergy(body: AdditiveModifyDto) {
    const email = body.email;
    const AdditiveArr = body.allergyAdditive;
    console.log(AdditiveArr);
    return await this.userRepository.updateAllergyAdditive(email, AdditiveArr);
    //return await this.userRepository.updateAllergyAdditive(email, body);
  }

  async setPrefer(body: AdditiveModifyDto) {
    const email = body.email;
    const AdditiveArr = body.allergyAdditive;
    return await this.userRepository.updatePreferAdditive(email, AdditiveArr);
  }
}

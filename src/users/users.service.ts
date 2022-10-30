import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserRequestDto } from 'src/dto/users.request.dto';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { AdditiveModifyDto } from 'src/dto/additive.modify.dto';
import { PreferAdditiveDto } from 'src/dto/prefer.additive.modify.dto';
import axios, { Axios } from 'axios';
import { pluck } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository, //private readonly authService: AuthService,
  ) {}
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

  async kakaoSignUp(body: UserRequestDto) {
    const { email, name } = body;
    const password = body.password + process.env.KAKAO_PWD;
    const isUserExist = await this.userRepository.existEmail(email);
    if (!isUserExist) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepository.create({
        email,
        name,
        password: hashedPassword,
      });
    }
  }

  // repository와 연결
  async setAllergy(body: AdditiveModifyDto) {
    const email = body.email;
    const AdditiveArr = body.allergyAdditive;
    console.log(AdditiveArr);
    return await this.userRepository.updateAllergyAdditive(email, AdditiveArr);
    //return await this.userRepository.updateAllergyAdditive(email, body);
  }

  async setPrefer(body: PreferAdditiveDto) {
    const email = body.email;
    const AdditiveArr = body.preferAdditive;
    return await this.userRepository.updatePreferAdditive(email, AdditiveArr);
  }

  async kakaoLogIn(authCode: any): Promise<any> {
    var accessToken: string;

    const grant_type = 'authorization_code';

    const client_id = process.env.KakaoAPI_client_id;
    const redirect_uri = 'http://43.201.142.236:8000/user/kakao/callback';
    const code = authCode;

    const _url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`;
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const _header = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    console.log('before axios');
    try {
      const res = await axios({
        method: 'POST',
        url: _url,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      console.log('kakao Token : ' + JSON.stringify(res.data));
      const userInfoHeader = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer ' + res.data.access_token,
      };
      const userInfo = await axios({
        method: 'GET',
        url: userInfoUrl,
        headers: userInfoHeader,
      });
      console.log('userInfo status = ' + userInfo.status);
      console.log('user info = ' + JSON.stringify(userInfo.data));
      const email = userInfo.data.email;
      const password = userInfo.data.kakaoId;
      const name = 'Messi';
      const user = {
        email,
        name,
        password,
      };

      const isUserExist = await this.userRepository.existEmail(email);
      if (!isUserExist) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.create({
          email,
          name,
          password: hashedPassword,
        });
      }
      return user;
    } catch (err) {
      console.log(err);
    }

    console.log('after axios');
  }
}

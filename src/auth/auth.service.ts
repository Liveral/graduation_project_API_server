import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/LoginRequestDto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async socialLogIn(data: LoginRequestDto) {
    const { email } = data;
    const user = await this.userRepository.findUserByEmail(email);

    const payload = { email: email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

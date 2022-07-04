import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { Payload } from './jwt.payload';
import { UserRepository } from 'src/users/users.repository';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY, //'secretKey'
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const user = await this.userRepository.findUserById(payload.sub);
    if (user) {
      return user; //request.user에 들어간다.
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}

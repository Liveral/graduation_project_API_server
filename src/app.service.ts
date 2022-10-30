import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getJson() {
    const res = {
      name: 'hong you bin',
      type: 'Json',
    };
    return res;
  }
}

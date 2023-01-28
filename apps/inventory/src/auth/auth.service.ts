import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  public yieldToken(param: any): string {
    const payload = _.pick(param, ['id', 'email']);
    const token: string = this.jwtService.sign(payload);
    return token
  }
}

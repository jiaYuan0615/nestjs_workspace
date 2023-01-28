import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '../exceptions/custom-badrequest.exception';
import _ from 'lodash';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({ usernameField: 'email' })
  }

  public async validate(email: string, password: string) {
    const payload = {
      id: '1',
      email,
      password
    }

    return payload
  }
}
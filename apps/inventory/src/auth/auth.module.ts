import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../guards/jwt.strategy';
import { LocalStrategy } from '../guards/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [
    AuthController
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }

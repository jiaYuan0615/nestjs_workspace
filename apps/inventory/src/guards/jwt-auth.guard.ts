import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CustomUnauthorizedException } from '../exceptions/custom-unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return super.canActivate(context);
  }

  // Custom Response
  handleRequest(err: any, user: any, info: any, context: any, status: any) {

    // No auth token
    if (info?.message === 'No auth token') {
      throw new CustomUnauthorizedException("==尚未登入，請登入後再進行==");
    }
    // jwt expired
    if (info?.message === 'jwt expired') {
      throw new CustomUnauthorizedException("==登入逾時，請重新登入==");
    }

    if (info?.message === 'jwt malformed') {
      throw new CustomUnauthorizedException("==發生錯誤，請重新登入==");
    }

    return super.handleRequest(err, user, info, context, status);
  }
}

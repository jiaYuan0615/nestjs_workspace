import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomUnauthorizedException extends HttpException {
  constructor(message: string = '尚未登入，請登入後再進行操作') {
    super({ status: HttpStatus.UNAUTHORIZED, message }, HttpStatus.UNAUTHORIZED);
  }
}
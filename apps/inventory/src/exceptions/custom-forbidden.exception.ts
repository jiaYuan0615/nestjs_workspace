import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomForbiddenException extends HttpException {
  constructor(message: string = '您的權限不足，無法進行操作') {
    super({ status: HttpStatus.FORBIDDEN, message }, HttpStatus.FORBIDDEN);
  }
}

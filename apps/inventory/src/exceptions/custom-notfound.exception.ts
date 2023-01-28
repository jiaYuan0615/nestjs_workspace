import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomNotFoundException extends HttpException {
  constructor(message: string = '找不到該項目資源') {
    super({ status: HttpStatus.NOT_FOUND, message }, HttpStatus.NOT_FOUND);
  }
}

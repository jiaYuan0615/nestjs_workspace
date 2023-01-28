import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomBadRequestException extends HttpException {
  constructor(message: string = '輸入的內容有誤') {
    super({ status: HttpStatus.BAD_REQUEST, message }, HttpStatus.BAD_REQUEST)
  }
}
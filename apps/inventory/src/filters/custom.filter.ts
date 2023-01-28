import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { CustomBadRequestException } from '../exceptions/custom-badrequest.exception';

@Catch()
export class CustomFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    // 400
    if (status === HttpStatus.BAD_REQUEST) {
      const message = error.message ? error.message : '==輸入的內容有誤==';
      return response.status(status).json({ message })
    }

    // 401
    if (status === HttpStatus.UNAUTHORIZED) {
      const message = error.message ? error.message : '==尚未登入，請登入後再進行操作==';
      return response.status(status).json({ message })
    }

    // 403
    if (status === HttpStatus.FORBIDDEN) {
      const message = error.message ? error.message : '==您的權限不足，無法進行操作==';
      return response.status(status).json({ message })
    }

    // 404
    if (status === HttpStatus.NOT_FOUND) {
      const message = error.message ? error.message : '==找不到該項目資源==';
      return response.status(status).json({ message })
    }

    // 500
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return response.status(status).json({ message: '==伺服器發生異常，請重新嘗試==' })
    }
  }
}

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { cwebp } from 'webp-converter';

@Injectable()
export class ImageInterceptor implements NestInterceptor {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // const controller = context.getClass().name;
    // const method = context.getHandler().name;
    const { file, files } = request;

    if (_.isUndefined(file)) {
      if (Object.keys(files).length > 0) {
        // Over One Fields Input
        request.files = await this.convertMultiFieldsImageToWebp(files);
      } else {
        request.files = await this.convertImagesToWebp(files);
      }
    } else {
      request.file = await this.convertImageToWebp(file);
    }
    return next.handle();
  }

  /** 轉換單張圖片
   * 
   * @param payload 
   * @returns
   */
  private async convertImageToWebp(payload: Express.Multer.File): Promise<Express.Multer.File> {
    const { path: paths, filename, destination, originalname } = payload;
    const transferFile = filename.replace(_.toLower(path.extname(originalname)), '.webp');
    const targetPath = path.resolve(destination, transferFile);
    await cwebp(paths, targetPath, '-q 80');
    // Get New Size From webp
    const { size } = fs.statSync(targetPath);

    // Delete Origin File
    if (fs.existsSync(paths)) fs.unlinkSync(paths);

    const file: Express.Multer.File = {
      ...payload,
      size,
      filename: transferFile,
      path: targetPath,
    };
    return file;
  }

  /** 轉換多張圖片
   * 
   * @param payload 
   * @returns 
   */
  private async convertImagesToWebp(payload: Array<Express.Multer.File>): Promise<Array<Express.Multer.File>> {
    const files = await Promise.all(payload.map(async (x) => {
      return await this.convertImageToWebp(x)
    }))

    return files
  }

  /** 轉換多張多鍵值圖片
   * 
   * @param payload 
   */
  private async convertMultiFieldsImageToWebp(payload: Array<Express.Multer.File>) {
    const files = new Object();
    // 取得各類別名稱
    await Promise.all(Object.keys(payload).map(async (key) => {
      files[key] = await Promise.all(payload[key].map(async (v: Express.Multer.File) => {
        return await this.convertImageToWebp(v);
      }));
    }));
    return files
  }
}

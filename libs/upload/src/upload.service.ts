import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CustomBadRequestException } from 'apps/inventory/src/exceptions/custom-badrequest.exception';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { parse, resolve } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService implements MulterOptionsFactory {
  constructor() { }
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const { fieldname, originalname } = file;
          if (!originalname.match(/\.(jpg|jpeg|png)$/gi)) {
            return callback(new CustomBadRequestException('上傳格式不符合'), '圖片上傳失敗')
          }
          const basePath = resolve(process.cwd(), './storage');
          if (!existsSync(basePath)) mkdirSync(basePath);

          const targetPath = resolve(basePath, `./${fieldname}`)
          if (!existsSync(targetPath)) mkdirSync(targetPath);
          callback(null, targetPath)
        },
        filename: (req, file, callback) => {
          callback(null, `${uuid()}${parse(file.originalname).ext}`)
        }
      })
    }
  }
}

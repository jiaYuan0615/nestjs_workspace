import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from '@app/upload';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: UploadService }),
  ],
  controllers: [
    ImageController
  ],
  providers: [
    ImageService
  ]
})
export class ImageModule { }

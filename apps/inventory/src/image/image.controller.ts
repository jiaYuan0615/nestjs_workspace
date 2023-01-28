import { Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ImageService } from './image.service';
import { resolve } from 'path';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CustomBadRequestException } from '../exceptions/custom-badrequest.exception';
import { ImageInterceptor } from '../interceptors/image.interceptor';
import { Public } from '../decorators/public.decorator';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const notFoundImage = resolve(process.cwd(), './src/assets/404.png');
@ApiTags('images')
@Controller('image')
export class ImageController {
  constructor(
    private imageService: ImageService,
    private configService: ConfigService
  ) { }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', type: String, description: '圖片編號' })
  async getImage(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    try {
      const items = await this.imageService.getData()
      console.log(items);

      res.status(HttpStatus.OK).sendFile(notFoundImage);
    } catch (error) {
      res.status(HttpStatus.OK).sendFile(notFoundImage);
    }
  }

  @Post()
  @Public()
  @UseInterceptors(FileInterceptor('image'), ImageInterceptor)
  async postImage(@Req() req: Request, @Res() res: Response) {
    const { file } = req;
    try {
      res.status(HttpStatus.OK).json({ message: '新增圖片成功' })
    } catch (error) {
      throw new CustomBadRequestException("新增圖片失敗")
    }
  }


  @Post('multiple')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 2 },
    { name: 'thumb', maxCount: 1 }
  ]), ImageInterceptor)
  async postMultipleImage(@Req() req: Request, @Res() res: Response) {
    const { files } = req;
    try {
      res.status(HttpStatus.OK).json({ message: '新增圖片成功' })
    } catch (error) {
      throw new CustomBadRequestException("新增圖片失敗")
    }
  }

  @Delete(':id')
  async deleteImage(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    try {
      res.status(HttpStatus.OK).json({ message: '刪除圖片成功' })
    } catch (error) {
      console.log(error);
      throw new CustomBadRequestException("刪除圖片失敗")
    }
  }

}

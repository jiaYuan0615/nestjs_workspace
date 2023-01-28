import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import _ from 'lodash';
import { Public } from './decorators/public.decorator';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('')
export class AppController {
  constructor(private appService: AppService) { }

  @Get()
  @Public()
  getHello(@Req() req: Request, @Res() res: Response): void {
    const message = this.appService.getHello();
    res.status(HttpStatus.OK).json({ message })
  }
}

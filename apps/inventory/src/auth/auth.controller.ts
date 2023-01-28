import { ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Public } from "../decorators/public.decorator";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { Request, Response } from "express";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async postLogin(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { user } = req;
    console.log(user);

    const token = this.authService.yieldToken(user);
    res.status(HttpStatus.OK).json({ message: '登入成功', token });
  }
}
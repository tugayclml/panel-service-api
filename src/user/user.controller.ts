import { Controller, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dtos/login.dtos';
import { RegisterDto } from './dtos/register.dtos';
import { ChangePasswordDto } from './dtos/changePassword.dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('register')
  createUser(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('changePassword')
  @UseGuards(AuthGuard('jwt'))
  changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    return this.userService.changePassword(req, changePasswordDto, res);
  }
}

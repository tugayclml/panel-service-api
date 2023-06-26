import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dtos/login.dtos';
import { extractTokenPayload } from 'src/utils/utils';
import { RegisterDto } from './dtos/register.dtos';
import { ChangePasswordDto } from './dtos/changePassword.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (user && (await compare(password, user.password))) {
      delete user.password;

      return {
        user,
        accessToken: this.jwtService.sign(
          { user: user },
          { secret: process.env.TOKEN, expiresIn: '86400s' },
        ),
      };
    }

    return { errorMessage: 'Kullanıcı bulunamadı.' };
  }

  async register(registerDto: RegisterDto) {
    try {
      const { username, password } = registerDto;

      const newUser = new User();
      newUser.username = username;
      newUser.password = await hash(password, 10);
      newUser.role = 'ADMIN';

      const user = await this.userRepository.manager.save(newUser);

      return {
        id: user.id,
        username: user.username,
        accessToken: this.jwtService.sign(
          { user: user },
          { secret: process.env.TOKEN, expiresIn: '86400s' },
        ),
      };
    } catch (error) {
      return { error: error };
    }
  }

  async changePassword(
    req: Request,
    changePasswordDto: ChangePasswordDto,
    res: Response,
  ) {
    const tokenPayload = extractTokenPayload(req);

    if (changePasswordDto.newPassword != changePasswordDto.newPasswordAgain) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ errorMessage: 'Yeni şifre ile tekrarı aynı değildir.' });
    }

    const user = await this.userRepository.findOneBy({
      id: tokenPayload['user'].id,
    });

    user.password = await hash(changePasswordDto.newPassword, 10);

    await this.userRepository.save(user);

    return res.status(HttpStatus.OK).send({
      message: 'Şifreniz başarıyla değiştirilmiştir.',
    });
  }
}

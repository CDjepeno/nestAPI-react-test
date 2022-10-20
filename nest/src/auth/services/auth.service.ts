import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { NotFound, Unauthorized } from 'nest/src/errors/httpsError';
import { User } from 'nest/src/typeorm/entites/User';
import { CreateUserdto, LoginUserDto } from 'nest/src/user/dtos';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async connect(credentials: LoginUserDto) {
    const user: User = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    if (!user) {
      throw new NotFound('User not found');
    }
    const pwMatches = await argon.verify(user.password, credentials.password);

    if (!pwMatches) {
      throw new Unauthorized('credential incorrect');
    }

    const jwt = await this.signToken(user.id, user.email);

    return { access_token: jwt };
  }

  async createUser(userDetails: CreateUserdto) {
    try {
      const hash = await argon.hash(userDetails.password);
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hash,
      });
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
  }
}

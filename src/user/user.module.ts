import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/User';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/startegy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UserModule {}

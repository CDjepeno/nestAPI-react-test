import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}

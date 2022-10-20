import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entites/User';
import { Repository } from 'typeorm';
import { InternalServerError, NotFound } from 'src/errors/httpsError';
import { UpdateUserdto } from '../dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    try {
      const users = await this.userRepository.find();
      const tab = JSON.parse(JSON.stringify(users)) 
      console.log(tab);
      if (!users) {
        return new NotFound(`Users not found`);
      }
      return users;
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal server error !');
    }
  }

  async getUsersById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (typeof user === 'undefined') {
        throw new NotFound(`unknow this user`);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal server error !');
    }
  }

  async updateUser(newUserUpdated: UpdateUserdto, id: number) {
    try {
      const userToUpdate = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!userToUpdate) {
        throw new NotFound('unknow this user');
      }
      this.userRepository.merge(userToUpdate, newUserUpdated);
      await this.userRepository.save(userToUpdate);
      return 'user updated';
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal server error !');
    }
  }

  async deleteUser(id: number) {
    try {
      const userToDelete = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!userToDelete) {
        throw new NotFound(`unknow this user`);
      }
      await this.userRepository.delete(userToDelete);
      return 'user deleted';
    } catch (err) {
      throw new Error(err);
    }
  }
}

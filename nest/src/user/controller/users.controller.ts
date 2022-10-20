import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.services';
import { JwtGauard } from '../../auth/guard/jwt.guard';
import { UpdateUserdto } from '../dtos/UpdateUser.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerError } from 'nest/src/errors/httpsError';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Api to get users' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('users')
  getUsers() {
    try {
      return this.userService.getUsers();
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal Server Error');
    }
  }

  @ApiOperation({ summary: 'Api to get user by id' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @UseGuards(JwtGauard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    try {
      return this.userService.getUsersById(+id);
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal Server Error');
    }
  }

  @ApiOperation({ summary: 'Api to update user' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          example: 'Marc',
          description: 'this is a firstname',
        },
        lastname: {
          type: 'string',
          example: 'Dubois',
          description: 'this is a lastname',
        },
        email: {
          type: 'string',
          example: 'email@gmail.fr',
          description: 'this is a firstname',
        },
        password: {
          type: 'string',
          example: 'password',
          description: 'this is a firstname',
        },
      },
    },
  })
  @UseGuards(JwtGauard)
  @Put(':id')
  UpdateUSer(@Param('id') id: string, @Body() dto: UpdateUserdto) {
    try {
      return this.userService.updateUser(dto, +id);
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal Server Error');
    }
  }

  @ApiOperation({ summary: 'Api to delete user' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
  })
  @UseGuards(JwtGauard)
  @Delete(':id')
  DeleteUSer(@Param('id') id: number) {
    try {
      return this.userService.deleteUser(+id);
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Internal Server Error');
    }
  }
}

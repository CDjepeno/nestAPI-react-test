import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserdto, LoginUserDto } from 'src/user/dtos';
import { AuthService } from '../services/auth.service';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'API to authenticate to use the services' })
  @ApiResponse({
    status: 200,
    description: 'return token for use api',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'credential incorrect',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'email@gmail.fr',
          description: 'this is a firstname',
        },
        password: {
          type: 'string',
          example: 'pasword',
          description: 'this is a firstname',
        },
      },
    },
  })
  loging(@Body() dto: LoginUserDto) {
    return this.authService.connect(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'API to register as new user' })
  @ApiResponse({
    status: 200,
    description: 'to register',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
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
  register(@Body() dto: CreateUserdto) {
    return this.authService.createUser(dto);
  }
}

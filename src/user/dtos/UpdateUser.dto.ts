import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserdto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

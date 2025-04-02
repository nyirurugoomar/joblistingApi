import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../schemas/user.schema';


export class SignupDto {
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email: string;

    @MinLength(10)
    password: string;

    @IsEnum(Role)
    role: Role;
  }
  
  export class SigninDto {
    email: string;
    password: string;
  }
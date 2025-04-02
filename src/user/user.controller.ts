import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto,SigninDto } from './Dto/user.dto';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }
}

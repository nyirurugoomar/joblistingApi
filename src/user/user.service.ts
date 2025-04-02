import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { SignupDto,SigninDto } from './Dto/user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { name,email, password } = signupDto;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new this.userModel({ name,email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return { token };
  }

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { email, password } = signinDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // Generate token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return { token };
  }
}

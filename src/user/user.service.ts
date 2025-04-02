import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from './schemas/user.schema';
import { SignupDto, SigninDto } from './Dto/user.dto';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ email: string; name: string; role: Role; token: string }> {
    const { name, email, password, role } = signupDto;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new this.userModel({ name, email, role, password: hashedPassword });
    await user.save();

    // Generate token using JWT_SECRET
    const token = this.jwtService.sign(
      { userId: user._id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' } // Ensure secret is used
    );

    return { 
      email: user.email,
      name: user.name,
      role: user.role,
      token 
    };
  }

  async signin(signinDto: SigninDto): Promise<{ email: string; name: string; role: Role; token: string }> {
    const { email, password } = signinDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid Email');

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Password');

    // Generate token using JWT_SECRET
    const token = this.jwtService.sign(
      { userId: user._id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' } // Ensure secret is used
    );

    return { 
      email: user.email,
      name: user.name, 
      role: user.role,
      token 
    };
  }
}

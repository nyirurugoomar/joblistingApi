import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

interface AuthenticatedRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized - No Bearer Token');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token using the correct secret key
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      console.log('Decoded Token:', decoded);
      request.user = decoded; // Attach user info to request

      return true;
    } catch (error) {
      console.error('JWT Error:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from './schemas/user.schema';


interface AuthenticatedRequest extends Request {
  user?: any; 
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    if (!decoded || !decoded.role) {
      throw new ForbiddenException('Invalid token');
    }

    request.user = decoded; 

    if (!requiredRoles || requiredRoles.includes(decoded.role)) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to perform this action');
  }
}

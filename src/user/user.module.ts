import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
  JwtModule.register({
    secret: 'JWT_SECRET', 
    signOptions: { expiresIn: '1h' },
  })],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

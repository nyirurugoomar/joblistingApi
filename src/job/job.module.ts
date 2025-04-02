import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobSchema } from './schemas/job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Job',schema:JobSchema}]),
    JwtModule.register({
      secret: 'JWT_SECRET', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}

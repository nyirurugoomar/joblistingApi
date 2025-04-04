import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, 
    }),
    MongooseModule.forRoot(process.env.DB_URI), 
    JobModule,
    JobApplicationModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,CloudinaryProvider],
})
export class AppModule {}

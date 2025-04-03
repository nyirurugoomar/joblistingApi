import { Controller, Get, Post, Param, Body, Patch, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../user/auth.guard';
import { Roles } from '../user/roles.decorator';
import { Role } from '../user/schemas/user.schema';


@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  // Upload file and create job application
  @UseGuards(AuthGuard)
  @Post(':jobId/:applicantId')
  @UseInterceptors(FileInterceptor('resume', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async create(
    @Param('jobId') jobId: string,
    @Param('applicantId') applicantId: string,
    @UploadedFile() resumeFile: Express.Multer.File,
  ) {
    return this.jobApplicationService.create(jobId, applicantId, resumeFile);
  }

  // Get all applications
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.jobApplicationService.findAll();
  }

  // Get a single application
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobApplicationService.findOne(id);
  }

  // Update application status
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.jobApplicationService.updateStatus(id, status);
  }

  // Delete application
  @UseGuards(AuthGuard)
  @Roles(Role.RECRUITER, Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobApplicationService.delete(id);
  }
}

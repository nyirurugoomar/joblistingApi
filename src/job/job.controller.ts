import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, UpdateJobDto } from './Dto/job.dto';
import { AuthGuard } from '../user/auth.guard';
import { Roles } from '../user/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';


@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  // Everyone can get jobs (Job Seekers, Recruiters, Admins)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  // Only Recruiters and Admins can create jobs
  @UseGuards(AuthGuard)
  @Roles(Role.RECRUITER, Role.ADMIN)
  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    return this.jobService.create(createJobDto, req.user);
  }

  // Everyone can get a single job
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  // Only Recruiters and Admins can update jobs
  @UseGuards(AuthGuard)
  @Roles(Role.RECRUITER, Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  // Only Recruiters and Admins can delete jobs
  @UseGuards(AuthGuard)
  @Roles(Role.RECRUITER, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}

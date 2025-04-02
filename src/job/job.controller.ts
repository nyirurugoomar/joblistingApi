import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, UpdateJobDto } from './Dto/job.dto';
import { AuthGuard } from '../user/auth.guard';




@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }
   
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}

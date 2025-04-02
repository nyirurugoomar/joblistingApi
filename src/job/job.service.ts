import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto, UpdateJobDto } from './Dto/job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name)
   private jobModel: Model<Job>) 
   {}

  
  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = new this.jobModel(createJobDto);
    return job.save();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }
  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const updatedJob = await this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
    if (!updatedJob) throw new NotFoundException('Job not found');
    return updatedJob;
  }
  async delete(id: string): Promise<void> {
    const deletedJob = await this.jobModel.findByIdAndDelete(id).exec();
    if (!deletedJob) throw new NotFoundException('Job not found');
  }


}

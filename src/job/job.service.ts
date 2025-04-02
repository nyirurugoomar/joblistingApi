import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { CreateJobDto, UpdateJobDto } from './Dto/job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobModel.findById(id);
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async create(createJobDto: CreateJobDto, user): Promise<Job> {
    const newJob = new this.jobModel({
      ...createJobDto,
      createdBy: user.userId, // Attach creator's ID
    });
    return newJob.save();
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.jobModel.findByIdAndDelete(id);
  }
}

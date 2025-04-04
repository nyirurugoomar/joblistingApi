import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Role } from 'src/user/schemas/user.schema';
import { Job } from 'src/job/schemas/job.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  // Get all users
  async getAllUsers() {
    return this.userModel.find().exec();
  }

  // Get all jobs
  async getAllJobs() {
    return this.jobModel.find().exec();
  }

  // Delete a flagged job (for example, jobs that are marked as 'flagged')
  async deleteFlaggedJob(id: string): Promise<Job> {
    const job = await this.jobModel.findByIdAndDelete(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  // Update user roles
  async updateUserRole(userId: string, role: Role): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.role = role;
    return user.save();
  }
}

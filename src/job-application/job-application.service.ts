import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobApplication } from './schemas/jobApplication.schema';

import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectModel(JobApplication.name) private jobApplicationModel: Model<JobApplication>,
  ) {}

  // Upload file to Cloudinary
  async uploadResume(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, (error, result: UploadApiResponse) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      });
    });
  }

  // Create Job Application
  async create(jobId: string, applicantId: string, resumeFile: Express.Multer.File) {
    const resumeUrl = await this.uploadResume(resumeFile);
    const newApplication = new this.jobApplicationModel({ jobId, applicantId, resumeUrl });
    return newApplication.save();
  }

  // Get all applications
  async findAll() {
    return this.jobApplicationModel.find().exec();
  }

  // Get one application by ID
  async findOne(id: string) {
    const application = await this.jobApplicationModel.findById(id).exec();
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  // Update application status
  async updateStatus(id: string, status: string) {
    const application = await this.jobApplicationModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  // Delete application
  async delete(id: string) {
    return this.jobApplicationModel.findByIdAndDelete(id);
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobApplicationDocument = JobApplication & Document;

@Schema({ timestamps: true })
export class JobApplication extends Document {
  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  applicantId: string;

  @Prop({ required: true })
  resumeUrl: string;

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);

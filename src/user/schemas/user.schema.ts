import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  JOB_SEEKER = 'job_seeker',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.JOB_SEEKER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty() @IsString()
  title: string;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNotEmpty() @IsString()
  category: string;

  @IsNotEmpty() @IsString()
  location: string;

  @IsNotEmpty() @IsNumber()
  salary: number;

  @IsArray() @IsNotEmpty()
  skills: string[];
}

export class UpdateJobDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;

  @IsString()
  location?: string;

  @IsNumber()
  salary?: number;

  @IsArray()
  skills?: string[];
}

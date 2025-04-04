import { Controller, Get, Param, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/schemas/user.schema';
import { AuthGuard } from '../user/auth.guard';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all users
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // Get all jobs
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('jobs')
  async getAllJobs() {
    return this.adminService.getAllJobs();
  }

  // Delete flagged job
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)  
  @Delete('jobs/flagged/:id')
  async deleteFlaggedJob(@Param('id') id: string) {
    return this.adminService.deleteFlaggedJob(id);
  }

  // Update user role
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Put('users/:id/role')
  async updateUserRole(
    @Param('id') userId: string,
    @Body('role') role: Role,
  ) {
    return this.adminService.updateUserRole(userId, role);
  }
}

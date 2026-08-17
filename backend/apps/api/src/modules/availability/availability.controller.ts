import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { Public } from '@app/auth';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Public()
  @Get('check')
  async checkAvailability(
    @Query('date') date: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const isAvailable = await this.availabilityService.checkAvailability(
      new Date(date),
      startTime,
      endTime,
    );
    return { available: isAvailable, date, startTime, endTime };
  }
}

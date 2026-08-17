import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard, RolesGuard, Roles, Role, Public } from '@app/auth';
import { BookingStatus } from './schemas/booking.schema';

interface AuthenticatedRequest extends ExpressRequest {
  user: { sub: string; role: string; email: string };
}

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Public() // Temporary bypass until Auth is built
  create(@Request() req: AuthenticatedRequest, @Body() createBookingDto: CreateBookingDto) {
    const customerId = req.user?.sub || '64d1f1e1c1b1a1a1a1a1b1b1'; // Mock ID if no auth token
    return this.bookingsService.createBooking(customerId, createBookingDto);
  }

  @Get('my-bookings')
  @Roles(Role.CUSTOMER)
  findMyBookings(@Request() req: AuthenticatedRequest) {
    return this.bookingsService.getUserBookings(req.user.sub);
  }

  @Get(':id')
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.PHOTOGRAPHER)
  findOne(@Param('id') id: string) {
    return this.bookingsService.getBookingById(id);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body('status') status: BookingStatus) {
    return this.bookingsService.updateBookingStatus(id, status);
  }
}

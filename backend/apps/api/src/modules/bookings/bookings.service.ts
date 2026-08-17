import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus, PricingDetails } from './schemas/booking.schema';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import { PackagesService } from '../packages/packages.service';
import { AddonsService } from '../addons/addons.service';
import { CouponsService } from '../coupons/coupons.service';
import { PaymentsService } from '../payments/payments.service';
import { AvailabilityService } from '../availability/availability.service';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly configService: ConfigService,
    private readonly packagesService: PackagesService,
    private readonly addonsService: AddonsService,
    private readonly couponsService: CouponsService,
    private readonly paymentsService: PaymentsService,
    private readonly availabilityService: AvailabilityService,
  ) {}

  async createBooking(customerId: string, createBookingDto: CreateBookingDto) {
    // 0. Check and lock availability
    // Wait, we need a booking ID for the lock. Let's generate it first.
    const date = new Date();
    const year = date.getFullYear();
    const count = await this.bookingsRepository.countDocuments({
      createdAt: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      }
    });
    const bookingId = `BKG-${year}-${String(count + 1).padStart(4, '0')}`;
    
    // Acquire the lock (throws ConflictException if unavailable)
    await this.availabilityService.lockSlot(
      new Date(createBookingDto.scheduledDate),
      createBookingDto.startTime,
      createBookingDto.endTime,
      bookingId,
    );

    try {
      // 1. Calculate pricing
      const pkg = await this.packagesService.findOne(createBookingDto.packageId);
      if (!pkg) throw new NotFoundException('Package not found');
      
      let basePrice = pkg.price;
      let addonsPrice = 0;
      
      if (createBookingDto.addonIds && createBookingDto.addonIds.length > 0) {
        for (const addonId of createBookingDto.addonIds) {
          const addon = await this.addonsService.findOne(addonId);
          if (addon) addonsPrice += addon.price;
        }
      }
      
      // Hardcode delivery charge for now since we haven't implemented ServiceZones matching perfectly
      const deliveryCharge = 500; 
      let discount = 0;
      
      if (createBookingDto.appliedCouponId) {
         const coupon = await this.couponsService.findOne(createBookingDto.appliedCouponId);
         if (coupon && coupon.isActive) {
            if (coupon.discountType === 'PERCENTAGE') {
               discount = (basePrice + addonsPrice) * (coupon.discountValue / 100);
               if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                  discount = coupon.maxDiscount;
               }
            } else {
               discount = coupon.discountValue;
            }
         }
      }
      
      const totalPrice = basePrice + addonsPrice + deliveryCharge - discount;
      const advancePaid = totalPrice * 0.2; // 20% advance
      const balanceDue = totalPrice - advancePaid;
  
      const pricing: PricingDetails = {
        basePrice,
        addonsPrice,
        deliveryCharge,
        discount,
        totalPrice,
        advancePaid,
        balanceDue,
      };
  
      // 2. Create Booking Record
      const booking = await this.bookingsRepository.create({
        bookingId,
        customerId: new Types.ObjectId(customerId),
        serviceId: new Types.ObjectId(createBookingDto.serviceId),
        packageId: new Types.ObjectId(createBookingDto.packageId),
        addonIds: createBookingDto.addonIds?.map(id => new Types.ObjectId(id)) || [],
        scheduledDate: new Date(createBookingDto.scheduledDate),
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
        location: createBookingDto.location,
        pricing,
        status: BookingStatus.PENDING_PAYMENT,
        appliedCouponId: createBookingDto.appliedCouponId ? new Types.ObjectId(createBookingDto.appliedCouponId) : undefined,
        customerNotes: createBookingDto.customerNotes,
      });
      
      // 3. Create Payment Order Mock
      const paymentOrder = await this.paymentsService.createPaymentOrder(bookingId, advancePaid, 'INR');
      
      return {
        booking,
        paymentOrder,
      };
    } catch (error) {
      // Release lock if booking creation failed
      await this.availabilityService.releaseLock(
        new Date(createBookingDto.scheduledDate),
        createBookingDto.startTime,
        createBookingDto.endTime,
      );
      throw error;
    }
  }

  async getBookingById(id: string) {
    const booking = await this.bookingsRepository.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async getUserBookings(customerId: string) {
    return this.bookingsRepository.find({ customerId: new Types.ObjectId(customerId) });
  }

  async updateBookingStatus(id: string, status: BookingStatus) {
    return this.bookingsRepository.update(id, { status });
  }
}

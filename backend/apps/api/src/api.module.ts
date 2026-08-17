import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ServicesModule } from './modules/services/services.module';
import { PackagesModule } from './modules/packages/packages.module';
import { AddonsModule } from './modules/addons/addons.module';
import { ServiceZonesModule } from './modules/service-zones/service-zones.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ServicesModule,
    PackagesModule,
    AddonsModule,
    ServiceZonesModule,
    CouponsModule,
    BookingsModule,
    PaymentsModule,
    AvailabilityModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/database';
import { Coupon } from './schemas/coupon.schema';

@Injectable()
export class CouponsRepository extends AbstractRepository<Coupon> {
  protected readonly logger = new Logger(CouponsRepository.name);

  constructor(@InjectModel(Coupon.name) couponModel: Model<Coupon>) {
    super(couponModel);
  }
}

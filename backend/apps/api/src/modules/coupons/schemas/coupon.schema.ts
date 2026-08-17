import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/database';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

@Schema({ versionKey: false, timestamps: true })
export class Coupon extends AbstractDocument {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, enum: DiscountType })
  discountType: DiscountType;

  @Prop({ required: true })
  discountValue: number;

  @Prop({ required: false })
  maxDiscount: number;

  @Prop({ required: false })
  minOrderValue: number;

  @Prop({ required: true })
  validFrom: Date;

  @Prop({ required: true })
  validUntil: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  currentUsageCount: number;

  @Prop({ required: false })
  maxUsageLimit: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

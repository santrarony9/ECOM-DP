import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/database';

@Schema({ versionKey: false, timestamps: true })
export class ServiceZone extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: [String], required: true })
  pincodes: string[];

  @Prop({ required: true })
  deliveryCharge: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const ServiceZoneSchema = SchemaFactory.createForClass(ServiceZone);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/database';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Package extends AbstractDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Service' })
  serviceId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  durationMinutes: number;

  @Prop({ type: [String], default: [] })
  deliverables: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  allowExtraHours: boolean;

  @Prop({ default: 0 })
  extraHourRate: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

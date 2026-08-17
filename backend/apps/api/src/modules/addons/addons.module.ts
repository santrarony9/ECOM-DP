import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';
import { AddonsRepository } from './addons.repository';
import { Addon, AddonSchema } from './schemas/addon.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Addon.name, schema: AddonSchema }]),
  ],
  controllers: [AddonsController],
  providers: [AddonsService, AddonsRepository],
  exports: [AddonsService],
})
export class AddonsModule {}

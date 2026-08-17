import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/database';
import { Service } from './schemas/service.schema';

@Injectable()
export class ServicesRepository extends AbstractRepository<Service> {
  protected readonly logger = new Logger(ServicesRepository.name);

  constructor(@InjectModel(Service.name) serviceModel: Model<Service>) {
    super(serviceModel);
  }
}

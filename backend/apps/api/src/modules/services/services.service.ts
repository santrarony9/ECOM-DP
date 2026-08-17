import { Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.servicesRepository.create(createServiceDto);
  }

  async findAll() {
    return this.servicesRepository.find({});
  }

  async findOne(id: string) {
    return this.servicesRepository.findOne({ _id: id });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.servicesRepository.findOneAndUpdate(
      { _id: id },
      updateServiceDto
    );
  }

  async remove(id: string) {
    return this.servicesRepository.findOneAndDelete({ _id: id });
  }
}

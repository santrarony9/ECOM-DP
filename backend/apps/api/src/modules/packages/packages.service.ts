import { Injectable } from '@nestjs/common';
import { PackagesRepository } from './packages.repository';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Types } from 'mongoose';

@Injectable()
export class PackagesService {
  constructor(private readonly packagesRepository: PackagesRepository) {}

  async create(createPackageDto: CreatePackageDto) {
    return this.packagesRepository.create({
      ...createPackageDto,
      serviceId: new Types.ObjectId(createPackageDto.serviceId)
    });
  }

  async findAll() {
    return this.packagesRepository.find({});
  }

  async findOne(id: string) {
    return this.packagesRepository.findOne({ _id: id });
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packagesRepository.findOneAndUpdate(
      { _id: id },
      updatePackageDto
    );
  }

  async remove(id: string) {
    return this.packagesRepository.findOneAndDelete({ _id: id });
  }
}

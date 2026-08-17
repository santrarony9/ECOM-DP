import { Injectable } from '@nestjs/common';
import { AddonsRepository } from './addons.repository';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

@Injectable()
export class AddonsService {
  constructor(private readonly addonsRepository: AddonsRepository) {}

  async create(createAddonDto: CreateAddonDto) {
    return this.addonsRepository.create(createAddonDto);
  }

  async findAll() {
    return this.addonsRepository.find({});
  }

  async findOne(id: string) {
    return this.addonsRepository.findOne({ _id: id });
  }

  async update(id: string, updateAddonDto: UpdateAddonDto) {
    return this.addonsRepository.findOneAndUpdate(
      { _id: id },
      updateAddonDto
    );
  }

  async remove(id: string) {
    return this.addonsRepository.findOneAndDelete({ _id: id });
  }
}

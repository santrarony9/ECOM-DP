import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.usersRepository.find({ email });
    return users.length > 0 ? users[0] : null;
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }
}

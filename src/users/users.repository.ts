import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}

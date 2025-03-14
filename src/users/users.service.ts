import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(User, users);
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const newUser = this.usersRepository.create({ ...createUserDto, password: hashPassword });
    const savedUser = await this.usersRepository.save(newUser);
    return plainToInstance(User, savedUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

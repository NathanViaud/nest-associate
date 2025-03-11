import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      name: 'John Doe',
    },
    {
      id: '2',
      name: 'Test',
    },
    {
      id: '3',
      name: 'Super',
    },
  ];

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findAll(): User[] {
    return this.users;
  }
}

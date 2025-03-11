import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { UserRole } from '../dto/user-role.type';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ENTREPRENEUR })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

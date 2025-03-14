import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from '../dto/user-role.type';
import { Exclude } from 'class-transformer';
import { Interest } from 'src/interests/entities/interest.entity';

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

  @ManyToMany(() => Interest, (interest) => interest.users)
  @JoinTable()
  interests: Interest[];
}

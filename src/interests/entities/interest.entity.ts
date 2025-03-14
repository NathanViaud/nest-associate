import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Exclude()
  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}

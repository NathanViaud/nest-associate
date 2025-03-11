import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // @ManyToMany(() => User, (user) => user.interests)
  // users: User[];
}

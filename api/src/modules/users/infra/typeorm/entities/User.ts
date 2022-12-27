import { configUpload } from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Address } from './Address';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ default: false })
  @Exclude()
  deleted: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @Expose({
    name: 'age',
  })
  getAge(): number | null {
    const now = new Date();

    const age =
      now.getFullYear() -
      this.birthday.getFullYear() +
      (now.getMonth() < this.birthday.getMonth() ? -1 : 0);

    return age;
  }

  @Expose({
    name: 'avatar_url',
  })
  getAvatar_url(): string | null {
    if (!this.avatar) {
      return `${configUpload.url}/default/${process.env.PHOTO_DEFAULT}`;
    }

    return `${configUpload.url}/avatar/${this.avatar}`;
  }
}

export { User };

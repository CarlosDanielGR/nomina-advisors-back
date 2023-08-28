import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EXPERIENCE } from 'src/constant/experience.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  name: string;

  @Column('numeric')
  experience: EXPERIENCE;

  @Column('text', {
    nullable: true,
  })
  phone: string;

  @Column('numeric', {
    default: 0,
  })
  nomina: number;

  @Column('numeric', {
    default: 0,
  })
  total: number;
}

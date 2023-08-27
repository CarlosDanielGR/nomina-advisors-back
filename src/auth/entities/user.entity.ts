import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EXPERIENCE } from 'src/constant/experience.constant';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  email: string;

  password: string;

  name: string;

  experience: EXPERIENCE;

  phone: string;
}

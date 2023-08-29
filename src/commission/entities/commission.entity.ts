import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  profit: number;

  @Column('numeric')
  experience: number;

  @Column('numeric')
  target: number;
}

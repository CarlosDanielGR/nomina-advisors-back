import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  profit: number;

  @Column('numeric')
  condition: number;

  @Column('numeric')
  experience: number;
}

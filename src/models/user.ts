import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  username: String
  @Column()
  email: String
  @Column()
  comment?: String
}
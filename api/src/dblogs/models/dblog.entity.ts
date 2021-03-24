import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DBLogEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ unique: true })
  description: string;

  @Column()
  created_at: Date;
}
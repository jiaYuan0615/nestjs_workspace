import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  originalname: string

  @Column()
  size: Number

  @Column({ length: 30 })
  mimetype: string

  @Column({ type: 'text' })
  path: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}



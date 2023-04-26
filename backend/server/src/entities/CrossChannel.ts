import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class CrossChannel extends BaseEntity {
  @PrimaryColumn()
  channelId: string;

  @Column()
  channelName: string;

  @Column({ nullable: true })
  guildId?: string;

  @Column({ nullable: true })
  guildName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

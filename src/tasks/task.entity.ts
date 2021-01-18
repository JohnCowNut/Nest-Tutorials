import { TaskStatus } from './task-status.enum';

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from 'src/auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() // primary-key
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    @Column()
    status: TaskStatus
    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User

    @Column()
    userId: number;
} 
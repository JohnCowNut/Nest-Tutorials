import { TaskStatus } from './task-status.enum';

import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

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
} 
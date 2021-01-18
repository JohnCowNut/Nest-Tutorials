import { User } from 'src/auth/user.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
  }
  // private tasks: Task[] = [];

  async getTasks(filterDto: GetTaskFilterDto,
    user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user)
  }
  // async getTasks(): Promise<Task[]> {
  //   return await this.taskRepository.find();
  // }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }
  async getTaskById(id: number, user: User): Promise<Task> /*Task for entity*/ {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id }
    });
    if (!found) {
      throw new NotFoundException(`This id ${id} is doesn't exist`);
    }
    return found
  }


  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (!result.affected) {
      throw new NotFoundException(`This id ${id} is doesn't exist`);
    }
  }
  async updateStatusTaskById(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task: Task = await this.getTaskById(id, user);
    task.status = status;
    await task.save()
    return task;
  }
}

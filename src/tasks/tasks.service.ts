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

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto)
  }
  // async getTasks(): Promise<Task[]> {
  //   return await this.taskRepository.find();
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }
  async getTaskById(id: number): Promise<Task> /*Task for entity*/ {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`This id ${id} is doesn't exist`);
    }
    return found
  }


  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`This id ${id} is doesn't exist`);
    }
  }
  async updateStatusTaskById(id: number, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);
    task.status = status;
    await task.save()
    return task;
  }
}

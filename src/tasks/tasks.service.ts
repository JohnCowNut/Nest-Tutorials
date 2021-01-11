import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string) {
    return this.tasks.find((task) => task.id == id);
  }
}

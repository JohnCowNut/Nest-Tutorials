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
  createTask(createTaskDto: CreateTaskDto): Task {
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
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }
  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}

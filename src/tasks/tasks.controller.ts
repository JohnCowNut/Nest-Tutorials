import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    console.log('title :', title);
    console.log('description: ', description);
    return this.tasksService.createTask(title, description);
  }
}

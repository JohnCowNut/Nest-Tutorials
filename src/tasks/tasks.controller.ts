import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}

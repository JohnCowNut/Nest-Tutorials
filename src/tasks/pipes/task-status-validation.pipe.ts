import { TaskStatus } from './../task-status.enum';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';


export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatues = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROCESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status!`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatues.indexOf(status);
    return idx !== -1;
  }
}

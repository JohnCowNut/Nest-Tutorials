import { TaskStatus } from './../task-status.enum';

import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
export class GetTaskFilterDto {
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
  @IsOptional()
  status?: TaskStatus;
  @IsNotEmpty()
  @IsOptional()
  search?: string;
}

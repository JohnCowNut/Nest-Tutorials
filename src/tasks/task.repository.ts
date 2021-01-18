import { User } from 'src/auth/user.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Repository, EntityRepository } from "typeorm";
import { TaskStatus } from './task-status.enum';
// Task at entity not a model : model like interface
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task()
        task.description = description
        task.title = title
        task.user = user
        task.status = TaskStatus.OPEN
        await task.save()
        delete task.user
        return task;
    }
    async getTasks(filterDto: GetTaskFilterDto, user): Promise<Task[]> {
        const { status, search } = filterDto
        const query = this.createQueryBuilder('task')
        query.where('task.userId =:userId', { userId: user.id })
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            // @ %% for like regex
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }

        const tasks = await query.getMany()

        return tasks;
    }
}
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @Param('userId') userId: string,
    ): Promise<Task> {
        return this.tasksService.create(createTaskDto, userId);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get('id')
    async findOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.tasksService.remove(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // Crear tarea
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      user: userId,
    });
    return createdTask.save();
  }

  // Obtener todas las tareas
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // Obtener una tarea por ID
  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Tarea con el ID ${id} no encontrada`);
    }

    return task;
  }

  // Actualizar una tarea
  async update(id: string, updateTaskDto: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
      if (!updatedTask) {
        throw new NotFoundException(`Tarea con el ID ${id} no encontrada`);
      }

      return updatedTask;
  }

  // Eliminar una tarea
  async remove(id: string): Promise<void> {
    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Tarea con el ID ${id} no encontrada`);
    }
  }
}

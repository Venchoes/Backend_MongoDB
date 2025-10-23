import Task, { ITask } from '../models/task.model';
import { ITaskDTO, ITaskFilters } from '../types/task.types';
import { NotFoundException } from '../utils/exceptions.util';
import { logger } from '../utils/logger.util';

export class TaskService {
  /**
   * Cria uma nova tarefa
   */
  async createTask(userId: string, data: ITaskDTO): Promise<ITask> {
    try {
      logger.info(`Criando nova tarefa para usuário ${userId}`);

      const task = await Task.create({
        ...data,
        userId,
      });

      logger.info(`Tarefa criada com sucesso: ${task._id}`);
      return task;
    } catch (error: any) {
      logger.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }

  /**
   * Lista todas as tarefas do usuário com filtros opcionais
   */
  async getTasks(userId: string, filters: ITaskFilters): Promise<ITask[]> {
    try {
      logger.info(`Buscando tarefas do usuário ${userId} com filtros:`, filters);

      const query: any = { userId };

      // Filtro por status
      if (filters.status) {
        query.status = filters.status;
      }

      // Filtro por prioridade
      if (filters.priority) {
        query.priority = filters.priority;
      }

      // Busca por texto no título ou descrição
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } },
        ];
      }

      const tasks = await Task.find(query).sort({ createdAt: -1 });

      logger.info(`${tasks.length} tarefas encontradas`);
      return tasks;
    } catch (error: any) {
      logger.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  }

  /**
   * Busca uma tarefa específica por ID
   */
  async getTaskById(userId: string, taskId: string): Promise<ITask> {
    try {
      logger.info(`Buscando tarefa ${taskId} do usuário ${userId}`);

      const task = await Task.findOne({ _id: taskId, userId });

      if (!task) {
  throw new NotFoundException('Tarefa não encontrada');
      }

      return task;
    } catch (error: any) {
      logger.error('Erro ao buscar tarefa:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma tarefa (PUT - todos os campos)
   */
  async updateTask(userId: string, taskId: string, data: ITaskDTO): Promise<ITask> {
    try {
      logger.info(`Atualizando tarefa ${taskId} do usuário ${userId}`);

      const task = await Task.findOne({ _id: taskId, userId });

      if (!task) {
  throw new NotFoundException('Tarefa não encontrada');
      }

      // Atualiza todos os campos
      task.title = data.title;
      task.description = data.description;
      task.status = data.status || 'pending';
      task.priority = data.priority || 'medium';
      task.dueDate = data.dueDate;

      await task.save();

      logger.info(`Tarefa ${taskId} atualizada com sucesso`);
      return task;
    } catch (error: any) {
      logger.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  }

  /**
   * Atualiza parcialmente uma tarefa (PATCH - apenas campos fornecidos)
   */
  async patchTask(userId: string, taskId: string, data: Partial<ITaskDTO>): Promise<ITask> {
    try {
      logger.info(`Atualizando parcialmente tarefa ${taskId} do usuário ${userId}`);

      const task = await Task.findOne({ _id: taskId, userId });

      if (!task) {
  throw new NotFoundException('Tarefa não encontrada');
      }

      // Atualiza apenas os campos fornecidos
      if (data.title !== undefined) task.title = data.title;
      if (data.description !== undefined) task.description = data.description;
      if (data.status !== undefined) task.status = data.status;
      if (data.priority !== undefined) task.priority = data.priority;
      if (data.dueDate !== undefined) task.dueDate = data.dueDate;

      await task.save();

      logger.info(`Tarefa ${taskId} atualizada parcialmente com sucesso`);
      return task;
    } catch (error: any) {
      logger.error('Erro ao atualizar parcialmente tarefa:', error);
      throw error;
    }
  }

  /**
   * Deleta uma tarefa
   */
  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      logger.info(`Deletando tarefa ${taskId} do usuário ${userId}`);

      const task = await Task.findOne({ _id: taskId, userId });

      if (!task) {
  throw new NotFoundException('Tarefa não encontrada');
      }

      await Task.deleteOne({ _id: taskId });

      logger.info(`Tarefa ${taskId} deletada com sucesso`);
    } catch (error: any) {
      logger.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }

  /**
   * Verifica se uma tarefa pertence ao usuário
   */
  async verifyTaskOwnership(userId: string, taskId: string): Promise<boolean> {
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return false;
      }

      return task.userId.toString() === userId;
    } catch (error: any) {
      logger.error('Erro ao verificar propriedade da tarefa:', error);
      return false;
    }
  }
}
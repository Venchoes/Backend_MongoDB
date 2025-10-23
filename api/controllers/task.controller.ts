import { Response } from 'express';
import { AuthRequest } from '../types';
import { TaskService } from '../services/task.service';
import { logger } from '../utils/logger.util';

const taskService = new TaskService();

export class TaskController {
    async post(req: AuthRequest, res: Response): Promise<void> {
        try{
            const userId = req.userId!;
            const task = await taskService.createTask(userId, req.body);

      res.status(201).json({
                message: 'Tarefa criada com sucesso',
                data: task,
            });
        } catch(error: any){
            logger.error('Erro ao criar tarefa:', error);
            res.status(500).json({
                message: 'Erro interno ao criar tarefa',
                error: error.message,
            });
        }
    }

    async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const filters = {
        status: req.query.status as string,
        priority: req.query.priority as string,
        search: req.query.search as string,
      };

      const tasks = await taskService.getTasks(userId, filters);

      res.status(200).json({
        count: tasks.length,
        tasks,
      });
    } catch (error: any) {
      logger.error('Erro no controller ao buscar tarefas:', error);
      res.status(500).json({
        error: 'Erro ao buscar tarefas',
        message: error.message,
      });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const taskId = req.params.id;

      const task = await taskService.getTaskById(userId, taskId);

      res.status(200).json({ task });
    } catch (error: any) {
      logger.error('Erro no controller ao buscar tarefa:', error);

      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({
          error: 'Erro ao buscar tarefa',
          message: error.message,
        });
      }
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const taskId = req.params.id;

      const task = await taskService.updateTask(userId, taskId, req.body);

      res.status(200).json({
        message: 'Tarefa atualizada com sucesso',
        task,
      });
    } catch (error: any) {
      logger.error('Erro no controller ao atualizar tarefa:', error);

      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({
          error: 'Erro ao atualizar tarefa',
          message: error.message,
        });
      }
    }
  }

  async patch(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const taskId = req.params.id;

      const task = await taskService.patchTask(userId, taskId, req.body);

      res.status(200).json({
        message: 'Tarefa atualizada parcialmente com sucesso',
        task,
      });
    } catch (error: any) {
      logger.error('Erro no controller ao atualizar parcialmente tarefa:', error);

      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({
          error: 'Erro ao atualizar tarefa',
          message: error.message,
        });
      }
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const taskId = req.params.id;

      await taskService.deleteTask(userId, taskId);

      res.status(204).send();
    } catch (error: any) {
      logger.error('Erro no controller ao deletar tarefa:', error);

      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({
          error: 'Erro ao deletar tarefa',
          message: error.message,
        });
      }
    }
  }
}
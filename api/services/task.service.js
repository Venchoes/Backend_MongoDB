"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const exceptions_util_1 = require("../utils/exceptions.util");
const logger_util_1 = require("../utils/logger.util");
class TaskService {
    /**
     * Cria uma nova tarefa
     */
    async createTask(userId, data) {
        try {
            logger_util_1.logger.info(`Criando nova tarefa para usuário ${userId}`);
            const task = await task_model_1.default.create({
                ...data,
                userId,
            });
            logger_util_1.logger.info(`Tarefa criada com sucesso: ${task._id}`);
            return task;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao criar tarefa:', error);
            throw error;
        }
    }
    /**
     * Lista todas as tarefas do usuário com filtros opcionais
     */
    async getTasks(userId, filters) {
        try {
            logger_util_1.logger.info(`Buscando tarefas do usuário ${userId} com filtros:`, filters);
            const query = { userId };
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
            const tasks = await task_model_1.default.find(query).sort({ createdAt: -1 });
            logger_util_1.logger.info(`${tasks.length} tarefas encontradas`);
            return tasks;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    }
    /**
     * Busca uma tarefa específica por ID
     */
    async getTaskById(userId, taskId) {
        try {
            logger_util_1.logger.info(`Buscando tarefa ${taskId} do usuário ${userId}`);
            const task = await task_model_1.default.findOne({ _id: taskId, userId });
            if (!task) {
                throw new exceptions_util_1.NotFoundException('Tarefa não encontrada');
            }
            return task;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao buscar tarefa:', error);
            throw error;
        }
    }
    /**
     * Atualiza uma tarefa (PUT - todos os campos)
     */
    async updateTask(userId, taskId, data) {
        try {
            logger_util_1.logger.info(`Atualizando tarefa ${taskId} do usuário ${userId}`);
            const task = await task_model_1.default.findOne({ _id: taskId, userId });
            if (!task) {
                throw new exceptions_util_1.NotFoundException('Tarefa não encontrada');
            }
            // Atualiza todos os campos
            task.title = data.title;
            task.description = data.description;
            task.status = data.status || 'pending';
            task.priority = data.priority || 'medium';
            task.dueDate = data.dueDate;
            await task.save();
            logger_util_1.logger.info(`Tarefa ${taskId} atualizada com sucesso`);
            return task;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao atualizar tarefa:', error);
            throw error;
        }
    }
    /**
     * Atualiza parcialmente uma tarefa (PATCH - apenas campos fornecidos)
     */
    async patchTask(userId, taskId, data) {
        try {
            logger_util_1.logger.info(`Atualizando parcialmente tarefa ${taskId} do usuário ${userId}`);
            const task = await task_model_1.default.findOne({ _id: taskId, userId });
            if (!task) {
                throw new exceptions_util_1.NotFoundException('Tarefa não encontrada');
            }
            // Atualiza apenas os campos fornecidos
            if (data.title !== undefined)
                task.title = data.title;
            if (data.description !== undefined)
                task.description = data.description;
            if (data.status !== undefined)
                task.status = data.status;
            if (data.priority !== undefined)
                task.priority = data.priority;
            if (data.dueDate !== undefined)
                task.dueDate = data.dueDate;
            await task.save();
            logger_util_1.logger.info(`Tarefa ${taskId} atualizada parcialmente com sucesso`);
            return task;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao atualizar parcialmente tarefa:', error);
            throw error;
        }
    }
    /**
     * Deleta uma tarefa
     */
    async deleteTask(userId, taskId) {
        try {
            logger_util_1.logger.info(`Deletando tarefa ${taskId} do usuário ${userId}`);
            const task = await task_model_1.default.findOne({ _id: taskId, userId });
            if (!task) {
                throw new exceptions_util_1.NotFoundException('Tarefa não encontrada');
            }
            await task_model_1.default.deleteOne({ _id: taskId });
            logger_util_1.logger.info(`Tarefa ${taskId} deletada com sucesso`);
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao deletar tarefa:', error);
            throw error;
        }
    }
    /**
     * Verifica se uma tarefa pertence ao usuário
     */
    async verifyTaskOwnership(userId, taskId) {
        try {
            const task = await task_model_1.default.findById(taskId);
            if (!task) {
                return false;
            }
            return task.userId.toString() === userId;
        }
        catch (error) {
            logger_util_1.logger.error('Erro ao verificar propriedade da tarefa:', error);
            return false;
        }
    }
}
exports.TaskService = TaskService;

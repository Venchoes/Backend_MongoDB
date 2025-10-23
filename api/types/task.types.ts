import { Document } from 'mongoose';

export interface ITaskDTO {
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface ITaskFilters {
  status?: string;
  priority?: string;
  search?: string;
}

export interface ITaskResponse {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
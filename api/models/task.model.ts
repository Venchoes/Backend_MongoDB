// modelo task (to-do list)
import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    id: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    }

const TaskSchema: Schema = new Schema({
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
        type: String, 
        required: [true, 'Título é obrigatório'],
        trim: true,
        minlength: [1, 'Título deve ter no mínimo 1 caractere'],
        maxlength: [200, 'Título deve ter no máximo 200 caracteres'], 
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Descrição deve ter no máximo 500 caracteres'],
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
  });

TaskSchema.index({ id: 1, status: 1 });
TaskSchema.index({ id: 1, priority: 1 });
TaskSchema.index({ id: 1, createdAt: -1 });

export default mongoose.model<ITask>('Task', TaskSchema);
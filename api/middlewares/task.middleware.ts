import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 1, max: 200 })
    .withMessage('Título deve ter entre 1 e 200 caracteres'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status deve ser: pending, in_progress ou completed'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridade deve ser: low, medium ou high'),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];

export const updateTaskValidation = [
  param('id')
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage('ID da tarefa inválido'),
  
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 1, max: 200 })
    .withMessage('Título deve ter entre 1 e 200 caracteres'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status deve ser: pending, in_progress ou completed'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridade deve ser: low, medium ou high'),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];

export const patchTaskValidation = [
  param('id')
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage('ID da tarefa inválido'),
  
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Título não pode ser vazio')
    .isLength({ min: 1, max: 200 })
    .withMessage('Título deve ter entre 1 e 200 caracteres'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Descrição deve ter no máximo 1000 caracteres'),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status deve ser: pending, in_progress ou completed'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridade deve ser: low, medium ou high'),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];

export const taskIdValidation = [
  param('id')
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage('ID da tarefa inválido'),
];

export const taskFilterValidation = [
  query('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status deve ser: pending, in_progress ou completed'),
  
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridade deve ser: low, medium ou high'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Busca deve ter entre 1 e 100 caracteres'),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      error: 'Dados de entrada inválidos',
      details: errors.array(),
    });
    return;
  }

  next();
};
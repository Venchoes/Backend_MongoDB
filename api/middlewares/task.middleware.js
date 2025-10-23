"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.taskFilterValidation = exports.taskIdValidation = exports.patchTaskValidation = exports.updateTaskValidation = exports.createTaskValidation = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
exports.createTaskValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Título é obrigatório')
        .isLength({ min: 1, max: 200 })
        .withMessage('Título deve ter entre 1 e 200 caracteres'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Descrição deve ter no máximo 1000 caracteres'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status deve ser: pending, in_progress ou completed'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Prioridade deve ser: low, medium ou high'),
    (0, express_validator_1.body)('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];
exports.updateTaskValidation = [
    (0, express_validator_1.param)('id')
        .custom((value) => mongoose_1.default.isValidObjectId(value))
        .withMessage('ID da tarefa inválido'),
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Título é obrigatório')
        .isLength({ min: 1, max: 200 })
        .withMessage('Título deve ter entre 1 e 200 caracteres'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Descrição deve ter no máximo 1000 caracteres'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status deve ser: pending, in_progress ou completed'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Prioridade deve ser: low, medium ou high'),
    (0, express_validator_1.body)('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];
exports.patchTaskValidation = [
    (0, express_validator_1.param)('id')
        .custom((value) => mongoose_1.default.isValidObjectId(value))
        .withMessage('ID da tarefa inválido'),
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Título não pode ser vazio')
        .isLength({ min: 1, max: 200 })
        .withMessage('Título deve ter entre 1 e 200 caracteres'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Descrição deve ter no máximo 1000 caracteres'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status deve ser: pending, in_progress ou completed'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Prioridade deve ser: low, medium ou high'),
    (0, express_validator_1.body)('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Data de vencimento deve ser uma data válida (ISO 8601)'),
];
exports.taskIdValidation = [
    (0, express_validator_1.param)('id')
        .custom((value) => mongoose_1.default.isValidObjectId(value))
        .withMessage('ID da tarefa inválido'),
];
exports.taskFilterValidation = [
    (0, express_validator_1.query)('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status deve ser: pending, in_progress ou completed'),
    (0, express_validator_1.query)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Prioridade deve ser: low, medium ou high'),
    (0, express_validator_1.query)('search')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Busca deve ter entre 1 e 100 caracteres'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: 'Dados de entrada inválidos',
            details: errors.array(),
        });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;

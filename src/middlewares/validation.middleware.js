"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegistration = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Nome é obrigatório')
        .isLength({ min: 3 })
        .withMessage('Nome deve ter pelo menos 3 caracteres'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('E-mail é obrigatório')
        .isEmail()
        .withMessage('E-mail inválido'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Senha é obrigatória')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateLogin = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('E-mail é obrigatório')
        .isEmail()
        .withMessage('E-mail inválido'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Senha é obrigatória'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];
const userValidationRules_old = () => {
    return [
        (0, express_validator_1.body)('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        (0, express_validator_1.body)('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        (0, express_validator_1.body)('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ];
};

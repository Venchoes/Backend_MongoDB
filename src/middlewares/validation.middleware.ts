import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegistration = [
    body('name')
        .notEmpty()
        .withMessage('Nome é obrigatório')
        .isLength({ min: 3 })
        .withMessage('Nome deve ter pelo menos 3 caracteres'),
    body('email')
        .notEmpty()
        .withMessage('E-mail é obrigatório')
        .isEmail()
        .withMessage('E-mail inválido'),
    body('password')
        .notEmpty()
        .withMessage('Senha é obrigatória')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }
        next();
    }
];

export const validateLogin = [
    body('email')
        .notEmpty()
        .withMessage('E-mail é obrigatório')
        .isEmail()
        .withMessage('E-mail inválido'),
    body('password')
        .notEmpty()
        .withMessage('Senha é obrigatória'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];

const userValidationRules_old = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ];
};

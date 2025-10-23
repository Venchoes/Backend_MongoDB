import { Router, type Request, type Response } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
    createTaskValidation,
    updateTaskValidation,
    patchTaskValidation,
    taskIdValidation,
    taskFilterValidation,
    handleValidationErrors,
} from '../middlewares/task.middleware';

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.post(
    '/',
    createTaskValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.post(req, res)
);

router.get(
    '/',
    taskFilterValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.getAll(req, res)
);

router.get(
    '/:id',
    taskIdValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.getById(req, res)
);

router.put(
    '/:id',
    updateTaskValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.update(req, res)
);

router.patch(
    '/:id',
    patchTaskValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.patch(req, res)
);

router.delete(
    '/:id',
    taskIdValidation,
    handleValidationErrors,
    (req: Request, res: Response) => taskController.delete(req, res)
);

export default router;
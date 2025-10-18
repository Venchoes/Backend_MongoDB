import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';
import errorHandler from './middlewares/errorHandler.middleware';

export const configureApp = (app: Express) => {
	// Middleware para JSON
	app.use(express.json());

	// Rotas (MVP requer /register, /login e /protected)
	app.use('/', authRoutes); // POST /register, POST /login
	app.use('/protected', protectedRoutes); // GET /protected

	// Middleware de erro
	app.use(errorHandler);

	return app;
};
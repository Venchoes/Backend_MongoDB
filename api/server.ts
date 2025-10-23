import express from 'express';
import connectToDatabase from './database/connection.database';
import config from './config/env.config';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';
import taskRoutes from './routes/task.routes';
import errorHandler from './middlewares/errorHandler.middleware';
import { logger } from './utils/logger.util';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Inicialização do servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Iniciar servidor
    app.listen(config.PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${config.PORT}`);
      logger.info(`🗄️  MongoDB conectado`);
      logger.info(`✨ API disponível em: http://localhost:${config.PORT}`);
      logger.info(`❤️  Health check: http://localhost:${config.PORT}/health`);
    });
  } catch (error) {
    logger.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
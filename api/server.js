"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_database_1 = __importDefault(require("./database/connection.database"));
const env_config_1 = __importDefault(require("./config/env.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const protected_routes_1 = __importDefault(require("./routes/protected.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const logger_util_1 = require("./utils/logger.util");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api', protected_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.path,
    });
});
// Error handler
app.use(errorHandler_middleware_1.default);
// Inicialização do servidor
const startServer = async () => {
    try {
        // Conectar ao banco de dados
        await (0, connection_database_1.default)();
        // Iniciar servidor
        app.listen(env_config_1.default.PORT, () => {
            logger_util_1.logger.info(`🚀 Servidor rodando na porta ${env_config_1.default.PORT}`);
            logger_util_1.logger.info(`🗄️  MongoDB conectado`);
            logger_util_1.logger.info(`✨ API disponível em: http://localhost:${env_config_1.default.PORT}`);
            logger_util_1.logger.info(`❤️  Health check: http://localhost:${env_config_1.default.PORT}/health`);
        });
    }
    catch (error) {
        logger_util_1.logger.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;

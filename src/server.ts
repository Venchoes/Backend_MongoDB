import express from 'express';
import connectToDatabase from './database/connection.database';
import { configureApp } from './app';

const app = express();
const PORT = process.env.PORT || 3000;

console.log('[SERVER] Iniciando servidor...');
console.log('[SERVER] Ambiente:', process.env.NODE_ENV || 'development');

// Connect to the database
connectToDatabase();

// Configure the Express application
configureApp(app);

// Start the server
app.listen(PORT, () => {
    console.log('[SERVER] ✅ Servidor rodando em http://localhost:${PORT}');
    console.log('[SERVER] Endpoints disponíveis:');
    console.log('[SERVER]   POST /register');
    console.log('[SERVER]   POST /login');
    console.log('[SERVER]   GET /protected');
});
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
        console.log('[DATABASE] Conectando ao MongoDB...');
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('[DATABASE] ✅ Conexão com o MongoDB estabelecida com sucesso.');
    } catch (error) {
        console.error('[DATABASE] ❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
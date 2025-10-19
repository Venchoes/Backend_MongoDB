import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const getMongoUri = () => {
    const env = process.env.MONGODB_ENV || 'local';
    let uri = '';
    if (env === 'atlas') {
        uri = process.env.MONGODB_URI_ATLAS || '';
    } else {
        uri = process.env.MONGODB_URI_LOCAL || '';
    }
    if (!uri) {
        throw new Error(`[DATABASE] URI do MongoDB não definida para o ambiente: ${env}`);
    }
    return uri;
};

const connectToDatabase = async () => {
    try {
    const dbUri = getMongoUri();
    console.log('[DATABASE] Ambiente selecionado:', process.env.MONGODB_ENV);
    console.log('[DATABASE] Conectando ao MongoDB...');
    console.log('[DATABASE] URI:', dbUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    await mongoose.connect(dbUri);
    console.log('[DATABASE] ✅ Conexão com o MongoDB estabelecida com sucesso.');
    } catch (error) {
        console.error('[DATABASE] ❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
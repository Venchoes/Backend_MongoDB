import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Conexão secundária para dual sync
let secondaryConnection: mongoose.Connection | null = null;

const getSecondaryConnection = () => secondaryConnection;

const connectToDatabase = async () => {
    try {
        const dualSync = process.env.MONGODB_DUAL_SYNC === 'true';
        const uriLocal = process.env.MONGODB_URI_LOCAL;
        const uriAtlas = process.env.MONGODB_URI_ATLAS;

        if (dualSync) {
            console.log('[DATABASE] Modo DUAL SYNC ativado - conectando aos dois bancos...');
            
            // Conecta ao Atlas na conexão principal
            if (uriAtlas) {
                console.log('[DATABASE] Conectando ao MongoDB Atlas...');
                await mongoose.connect(uriAtlas);
                console.log('[DATABASE] ✅ Conectado ao MongoDB Atlas');
            }
            
            // Conecta ao Local na conexão secundária
            if (uriLocal) {
                console.log('[DATABASE] Conectando ao MongoDB Local...');
                secondaryConnection = mongoose.createConnection(uriLocal);
                // Aguarda a conexão estar pronta
                await new Promise<void>((resolve, reject) => {
                    const timeout = setTimeout(() => reject(new Error('Timeout connecting to Local DB')), 10000);
                    secondaryConnection!.on('connected', () => {
                        clearTimeout(timeout);
                        resolve();
                    });
                    secondaryConnection!.on('error', (err) => {
                        clearTimeout(timeout);
                        reject(err);
                    });
                });
                console.log('[DATABASE] ✅ Conectado ao MongoDB Local');
            }
            
            console.log('[DATABASE] ✅ Dual Sync configurado com sucesso!');
        } else {
            // Modo single (conecta apenas a um)
            const uri = uriAtlas || uriLocal;
            if (!uri) {
                throw new Error('[DATABASE] Nenhuma URI do MongoDB configurada!');
            }
            console.log('[DATABASE] Conectando ao MongoDB...');
            await mongoose.connect(uri);
            console.log('[DATABASE] ✅ Conexão estabelecida');
        }
    } catch (error) {
        console.error('[DATABASE] ❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export { secondaryConnection, getSecondaryConnection };
export default connectToDatabase;
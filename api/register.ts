import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../src/models/user.model';

const MONGODB_URI = process.env.MONGODB_URI_ATLAS || process.env.MONGODB_URI;

const globalAny: any = global;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI não configurada. Defina MONGODB_URI_ATLAS ou MONGODB_URI nas variáveis de ambiente.');
  }

  if (!globalAny._mongoConnection) {
    // cacheia a conexão entre invocações (Vercel serverless)
    globalAny._mongoConnection = await mongoose.connect(MONGODB_URI);
  }

  return globalAny._mongoConnection;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    await connectDB();

    // usa o modelo exportado do projeto (evita procurar por UserSchema não exportado)
    const UserModel = mongoose.models.User || User;

    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const exists = await (UserModel as any).findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Usuário já cadastrado' });
    }

    const user = await (UserModel as any).create({ name, email, password });

    // remove senha da resposta
    const userObj = user.toObject ? user.toObject() : user;
    if (userObj.password) delete userObj.password;

    return res.status(201).json({ user: userObj });
  } catch (err: any) {
    console.error('[api/register] error:', err);
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}

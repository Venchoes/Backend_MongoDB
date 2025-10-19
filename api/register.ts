import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { UserSchema } from '../src/models/user.model';

const MONGODB_URI = process.env.MONGODB_URI_ATLAS || process.env.MONGODB_URI;
let conn: typeof mongoose | null = null;

async function connectDB() {
  if (!conn) {
    conn = await mongoose.connect(MONGODB_URI!);
  }
  return conn;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    await connectDB();
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Usuário já cadastrado' });
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

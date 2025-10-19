import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../src/models/user.model';

const globalAny: any = global;

const MONGODB_URI = process.env.MONGODB_URI_ATLAS || process.env.MONGODB_URI;

async function ensureDb() {
  if (!MONGODB_URI) return false;
  if (!globalAny._mongoConnection) {
    try {
      globalAny._mongoConnection = await mongoose.connect(MONGODB_URI);
    } catch (err) {
      console.error('DB connect error:', err);
      return false;
    }
  }
  return true;
}

export default async function handler(req: Request, res: Response) {
  const ok = await ensureDb();
  return res.status(ok ? 200 : 500).json({
    status: ok ? 'ok' : 'db_error',
    env: {
      hasMongoUri: !!MONGODB_URI,
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  });
}

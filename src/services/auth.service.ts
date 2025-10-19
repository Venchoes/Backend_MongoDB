import { User } from '../models/user.model';
import { sign, verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserPayload } from '../types/index';
import { logger } from '../utils/logger.util';
import dotenv from 'dotenv';
import { BadRequestException, NotFoundException, UnauthorizedException, UnprocessableEntityException, ConflictException } from '../utils/exceptions.util';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (name: string, email: string, password: string) => {
    // Validações básicas para 422
    if (!name || name.length < 3) throw new UnprocessableEntityException('Nome deve ter pelo menos 3 caracteres');
    if (!email || !/.+@.+\..+/.test(email)) throw new UnprocessableEntityException('E-mail inválido');
    if (!password || password.length < 6) throw new UnprocessableEntityException('Senha deve ter pelo menos 6 caracteres');

    const exists = await User.findOne({ email }).select('_id');
    if (exists) throw new ConflictException('E-mail já existente');

    const newUser = new User({ name, email, password: password });
    await newUser.save();
    logger.info(`User registered: ${email}`);
    return newUser;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    if (!email || !/.+@.+\..+/.test(email)) throw new BadRequestException('E-mail inválido');
    if (!password) throw new BadRequestException('Senha inválida');

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        logger.warn(`Login failed: User not found for email ${email}`);
        throw new NotFoundException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.warn(`Login failed: Invalid password for email ${email}`);
        throw new UnauthorizedException('Senha incorreta');
    }

    const token = sign({ id: user._id.toString(), email: user.email } as UserPayload, JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in: ${email}`);
    return token;
};

export const verifyToken = (token: string): UserPayload | null => {
    try {
        const decoded = verify(token, JWT_SECRET) as UserPayload;
        logger.info(`Token verified for user: ${decoded.email}`);
        return decoded;
    } catch (error) {
        logger.error('Token verification failed:', error);
        return null;
    }
};
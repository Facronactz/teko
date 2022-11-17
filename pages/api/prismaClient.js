import { PrismaClient } from '@prisma/client';

let prism;

// eslint-disable-next-line import/prefer-default-export
export const prisma = prism || new PrismaClient({ log: ['info'] });

if (process.env.NODE_ENV !== 'production') prism = prisma;

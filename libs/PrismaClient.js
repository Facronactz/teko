import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({ log: ['query', 'error', 'info', 'warn'] });
    }
    prisma = global.prisma;
}

export default prisma;

import prisma from '@teko/libs/PrismaClient';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
    if (req.query) {
        const { id, role } = req.query;
        if (id) {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            return res.status(200).json({ message: 'User found', user });
        }
        if (role) {
            const users = await prisma.user.findMany({
                where: {
                    role: role.toUpperCase(),
                },
            });
            return res.status(200).json({ message: 'Users found', users });
        }
    }
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
}

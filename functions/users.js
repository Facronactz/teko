import prisma from '@teko/libs/PrismaClient';

class User {
    static async get(id) {
        if (id) {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            delete user.password;
            return user;
        }
        const users = await prisma.user.findMany();
        users.forEach((user) => {
            delete user.password;
        });
        return users;
    }

    static async post(req) {
        const { data } = req;
        const result = await prisma.user.create({
            data,
        });
        return result;
    }

    static async put(id, req) {
        const { data } = req;
        const result = await prisma.user.update({
            where: {
                id,
            },
            data,
        });
        return result;
    }

    static async delete(id) {
        const result = await prisma.user.delete({
            where: {
                id,
            },
        });
        delete result.password;
        return result;
    }
}

export default User;

import prisma from '@teko/libs/PrismaClient';
import bcrypt from 'bcrypt';

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
        // eslint-disable-next-line no-param-reassign
        if (!id) id = data.id;
        delete data.id;
        if (data.password) {
            // check if password is valid
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            // use bcrypt to compare password
            const valid = await bcrypt.compare(data.password, user.password);
            if (!valid) {
                return {
                    error: 'Password tidak valid',
                };
            }
            data.password = await bcrypt.hash(data.newPassword, 10);
            delete data.newPassword;
        }
        try {
            const result = await prisma.user.update({
                where: {
                    id,
                },
                data,
            });
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
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

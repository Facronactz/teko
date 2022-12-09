import prisma from '@teko/libs/PrismaClient';

class Sosmed {
    static async get(id, req) {
        const { lembaga } = req;
        if (id) {
            return prisma.sosialMedia.findUnique({
                where: {
                    id,
                },
                include: {
                    lembaga: true,
                },
            });
        }
        if (lembaga) {
            return prisma.sosialMedia.findMany({
                where: {
                    lembagaId: lembaga,
                },
                include: {
                    lembaga: true,
                },
            });
        }
        return prisma.sosialMedia.findMany({
            include: {
                lembaga: true,
            },
        });
    }

    static async post(req) {
        const { data } = req;
        const { lembaga } = data;
        if (!lembaga) {
            return { error: 'Lembaga is required' };
        }
        delete data.lembaga;
        let result;
        try {
            result = await prisma.sosialMedia.create({
                data: {
                    ...data,
                    lembaga: {
                        connect: {
                            id: lembaga,
                        },
                    },
                },
                include: {
                    lembaga: true,
                },
            });
        } catch (error) {
            console.error(error);
            return { error };
        }
        return result;
    }

    static async put(id, req) {
        const { data } = req;
        delete data.lembaga;
        let result;
        try {
            result = await prisma.sosialMedia.update({
                where: {
                    id,
                },
                data: {
                    ...data,
                },
                include: {
                    lembaga: true,
                },
            });
        } catch (error) {
            console.error(error);
            return { error };
        }
        return result;
    }

    static async delete(id) {
        let result;
        try {
            result = await prisma.sosialMedia.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            console.error(error);
            return { error };
        }
        return result;
    }
}

export default Sosmed;

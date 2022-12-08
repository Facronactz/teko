import prisma from '@teko/libs/PrismaClient';

class Sosmed {
    static async get(id, req) {
        const { lembaga } = req;
        if (id) {
            return prisma.sosmed.findUnique({
                where: {
                    id,
                },
                include: {
                    lembaga: true,
                },
            });
        }
        if (lembaga) {
            return prisma.sosmed.findMany({
                where: {
                    lembagaId: lembaga,
                },
                include: {
                    lembaga: true,
                },
            });
        }
        return prisma.sosmed.findMany({
            include: {
                lembaga: true,
            },
        });
    }

    static async post(req) {
        const { data } = req;
        const { lembaga } = data;
        delete data.lembaga;
        let result;
        try {
            result = await prisma.sosmed.create({
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
            console.log(error);
            return { error };
        }
        return result;
    }

    static async put(id, req) {
        const { data } = req;
        const { lembaga } = data;
        delete data.lembaga;
        let result;
        try {
            result = await prisma.sosmed.update({
                where: {
                    id,
                },
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
            console.log(error);
            return { error };
        }
        return result;
    }

    static async delete(req) {
        const { data } = req;
        const { id } = data;
        let result;
        try {
            result = await prisma.sosmed.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            console.log(error);
            return { error };
        }
        return result;
    }
}

export default Sosmed;

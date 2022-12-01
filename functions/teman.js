import prisma from '@teko/libs/PrismaClient';

class Teman {
    static async get(id) {
        if (id) {
            return prisma.lembaga.findUnique({
                where: {
                    id,
                },
                include: {
                    owner: true,
                    Kategori: true,
                    Kegiatan: true,
                    LembagaAdmin: true,
                    LembagaMembers: true,
                    Donasi: true,
                    SosialMedia: true,
                },
            });
        }
        return prisma.lembaga.findMany();
    }

    static async post(data, owner, kategori) {
        let result;
        try {
            result = await prisma.lembaga.create({
                data: {
                    ...data,
                    owner: {
                        connect: {
                            id: owner.id,
                        },
                    },
                },
                include: {
                    owner: true,
                },
            });
        } catch (error) {
            // console.log(error);
            if (error.code === 'P2002') {
                return { error: 'Nama Lembaga sudah ada' };
            }
            return { error };
        }
        try {
            const lembagaId = result.id;
            kategori.forEach(async (item) => {
                await prisma.lembaga.update({
                    where: {
                        id: lembagaId,
                    },
                    data: {
                        Kategori: {
                            connect: {
                                id: item.id,
                            },
                        },
                    },
                });
            });
            return result;
        } catch (error) {
            // console.log(error);
            return { error };
        }
    }

    static async delete(id) {
        try {
            const res = await prisma.lembaga.delete({
                where: {
                    id,
                },
            });
            return res;
        } catch (error) {
            if (error.code === 'P2025') {
                return { error: 'Lembaga tidak ditemukan' };
            }
            return { error };
        }
    }
}

export default Teman;

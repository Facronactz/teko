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
                    Kegiatan: {
                        include: {
                            Kategori: true,
                        },
                    },
                    LembagaAdmins: true,
                    LembagaMembers: true,
                    Donasi: true,
                    SosialMedia: true,
                },
            });
        }
        return prisma.lembaga.findMany({
            include: {
                owner: true,
                Kategori: true,
            },
        });
    }

    static async post(req) {
        const { data, owner, kategori } = req;
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
            const logo = data.logo ? data.logo : `${process.env.STORAGE_URL}/teko/teman/${lembagaId}`;
            result.logo = logo;
            kategori.forEach(async (item) => prisma.lembaga.update({
                where: {
                    id: lembagaId,
                },
                data: {
                    logo,
                    Kategori: {
                        connectOrCreate: {
                            where: { nama: item.nama },
                            create: { nama: item.nama },
                        },
                    },
                },
            }));
            return result;
        } catch (error) {
            // console.log(error);
            return { error };
        }
    }

    static async put(id, req) {
        const { data } = req;
        console.log(req);
        try {
            const result = await prisma.lembaga.update({
                where: {
                    id,
                },
                data,
            });
            return result;
        } catch (error) {
            console.log(error);
            if (error.code === 'P2002') {
                return { error: 'Nama Lembaga sudah ada' };
            }
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

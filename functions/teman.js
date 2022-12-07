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
        const { data } = req;
        const { owner, kategori } = data;
        delete data.owner;
        delete data.kategori;
        console.log(data, owner, kategori);
        let result;
        try {
            result = await prisma.lembaga.create({
                data: {
                    ...data,
                    owner: {
                        connect: {
                            id: owner,
                        },
                    },
                },
                include: {
                    owner: true,
                },
            });
        } catch (error) {
            console.log(error);
            if (error.code === 'P2002') {
                return { error: 'Nama Lembaga sudah ada' };
            }
            return { error };
        }
        if (!data.logo || data.logo === '') {
            data.logo = `${process.env.STORAGE_URL}/teko/teman/${result.id}`;
            await prisma.lembaga.update({
                where: {
                    id: result.id,
                },
                data: {
                    logo: data.logo,
                },
            });
            result.logo = data.logo;
        }
        try {
            const lembagaId = result.id;
            kategori.forEach(async (item) => prisma.lembaga.update({
                where: {
                    id: lembagaId,
                },
                data: {
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
            console.log(error);
            return { error };
        }
    }

    static async put(id, req) {
        const { data } = req;
        const { owner, kategori } = data;
        delete data.owner;
        delete data.kategori;
        if (owner) {
            try {
                const result = await prisma.lembaga.update({
                    where: {
                        id,
                    },
                    data: {
                        owner: {
                            connect: {
                                id: owner,
                            },
                        },
                    },
                    include: {
                        owner: true,
                    },
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
        if (kategori) {
            try {
                kategori.forEach(async (item) => prisma.lembaga.update({
                    where: {
                        id,
                    },
                    data: {
                        Kategori: {
                            connectOrCreate: {
                                where: { nama: item },
                                create: { nama: item },
                            },
                        },
                    },
                }));
                const lembaga = await prisma.lembaga.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        Kategori: true,
                    },
                });
                const kategoriLembaga = lembaga.Kategori.map((item) => item.nama);
                const kategoriToDelete = kategoriLembaga.filter((item) => !kategori.includes(item));
                kategoriToDelete.forEach(async (item) => prisma.lembaga.update({
                    where: {
                        id,
                    },
                    data: {
                        Kategori: {
                            disconnect: {
                                nama: item,
                            },
                        },
                    },
                }));
            } catch (error) {
                console.log(error);
                return { error };
            }
        }
        // console.log(req);
        try {
            const result = await prisma.lembaga.update({
                where: {
                    id,
                },
                data,
            });
            return result;
        } catch (error) {
            // console.log(error);
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

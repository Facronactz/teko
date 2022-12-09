import prisma from '@teko/libs/PrismaClient';

class Kegiatan {
    static async get(id, req) {
        const { lembaga } = req;
        if (id) {
            return prisma.kegiatan.findUnique({
                where: {
                    id,
                },
                include: {
                    lembaga: true,
                    Kategori: true,
                },
            });
        }
        if (lembaga) {
            return prisma.kegiatan.findMany({
                where: {
                    lembagaId: lembaga,
                },
                include: {
                    lembaga: true,
                    Kategori: true,
                },
            });
        }
        return prisma.kegiatan.findMany({
            include: {
                lembaga: true,
                Kategori: true,
            },
        });
    }

    static async post(req) {
        const { data } = req;
        const { kategori, lembaga } = data;
        delete data.kategori;
        delete data.lembaga;
        const tanggal = new Date(data.tanggal);
        console.log(tanggal);
        let result;
        try {
            result = await prisma.kegiatan.create({
                data: {
                    ...data,
                    tanggal,
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
        try {
            const kegiatanId = result.id;

            if (!data.banner || data.banner === '') {
                console.log(data.banner);
                data.banner = `${process.env.STORAGE_URL}/teko/teman/${result.id}`;
                await prisma.kegiatan.update({
                    where: {
                        id: result.id,
                    },
                    data: {
                        banner: data.banner,
                    },
                });
                result.banner = data.banner;
            }
            if (Array.isArray(kategori)) {
                kategori.forEach(async (item) => this.updateKategori(kegiatanId, item));
            } else {
                result = await this.updateKategori(kegiatanId, kategori);
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error };
        }
    }

    static async updateKategori(id, kategori) {
        return prisma.kegiatan.update({
            where: {
                id,
            },
            data: {
                Kategori: {
                    connectOrCreate: {
                        where: { nama: kategori.nama },
                        create: { nama: kategori.nama },
                    },
                },
            },
        });
    }

    static async put(id, req) {
        const { kategori } = req.data;
        delete req.data.kategori;

        try {
            const result = await prisma.kegiatan.update({
                where: {
                    id,
                },
                data: {
                    ...req.data,
                },
                include: {
                    lembaga: true,
                },
            });
            if (kategori) {
                kategori.forEach(async (item) => this.updateKategori(id, item));
                const kegiatan = await prisma.kegiatan.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        Kategori: true,
                    },
                });
                const kategoriKegiatan = kegiatan.Kategori.map((item) => item.nama);
                const kategoriToDelete = kategoriKegiatan.filter((item) => !kategori.includes(item));
                kategoriToDelete.forEach(async (item) => {
                    await prisma.kegiatan.update({
                        where: {
                            id,
                        },
                        data: {
                            Kategori: {
                                disconnect: {
                                    id: item,
                                },
                            },
                        },
                    });
                });
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error };
        }
    }

    static async delete(id) {
        try {
            const res = await prisma.kegiatan.delete({
                where: {
                    id,
                },
            });
            return res;
        } catch (error) {
            console.error(error);
            if (error.code === 'P2025') {
                return { error: 'Kegiatan tidak ditemukan' };
            }
            return { error };
        }
    }
}

export default Kegiatan;

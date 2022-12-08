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
            console.log(error);
            return { error };
        }
        try {
            const kegiatanId = result.id;
            const banner = data.banner ? data.banner : `${process.env.STORAGE_URL}/teko/kegiatan/${kegiatanId}`;
            result.banner = banner;
            if (Array.isArray(kategori)) {
                kategori.forEach(async (item) => this.updateKategori(kegiatanId, banner, item));
            } else {
                result = await this.updateKategori(kegiatanId, banner, kategori);
            }
            return result;
        } catch (error) {
            return { error };
        }
    }

    static async updateKategori(id, banner, kategori) {
        return prisma.kegiatan.update({
            where: {
                id,
            },
            data: {
                banner,
                Kategori: {
                    connectOrCreate: {
                        where: { nama: kategori.nama },
                        create: { nama: kategori.nama },
                    },
                },
            },
        });
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
            if (error.code === 'P2025') {
                return { error: 'Kegiatan tidak ditemukan' };
            }
            return { error };
        }
    }
}

export default Kegiatan;

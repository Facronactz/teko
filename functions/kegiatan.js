import prisma from '@teko/libs/PrismaClient';

class Kegiatan {
    static async get(id) {
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
        return prisma.kegiatan.findMany({
            include: {
                lembaga: true,
                Kategori: true,
            },
        });
    }

    static async post(req) {
        const { data, lembaga, kategori } = req;
        const tanggal = new Date(data.tanggal);
        let result;
        try {
            result = await prisma.kegiatan.create({
                data: {
                    ...data,
                    tanggal,
                    lembaga: {
                        connect: {
                            id: lembaga.id,
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
            const banner = data.banner ? data.banner : `${process.env.STORAGE_URL}/${kegiatanId}`;
            result.banner = banner;
            kategori.forEach(async (item) => prisma.kegiatan.update({
                where: {
                    id: kegiatanId,
                },
                data: {
                    banner,
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
            if (error.code === 'P2025') {
                return { error: 'Kegiatan tidak ditemukan' };
            }
            return { error };
        }
    }
}

export default Kegiatan;

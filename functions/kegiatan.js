import prisma from '@teko/libs/PrismaClient';

class Kegiatan {
    static async get(id, req) {
        const { lembaga, search, all } = req;
        if (id) {
            return this.getById(id);
        }
        if (lembaga) {
            return this.getByLembaga(lembaga);
        }
        if (search) {
            return this.getBySearch(search);
        }
        if (all) {
            return this.getAll();
        }
        return prisma.kegiatan.findMany({
            where: {
                active: true,
            },
            include: {
                lembaga: true,
                Kategori: true,
            },
        });
    }

    static async getAll() {
        return prisma.kegiatan.findMany({
            include: {
                lembaga: true,
                Kategori: true,
            },
        });
    }

    static async getById(id) {
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

    static async getByLembaga(id) {
        return prisma.kegiatan.findMany({
            where: {
                lembagaId: id,
            },
            include: {
                lembaga: true,
                Kategori: true,
            },
        });
    }

    static async getBySearch(search) {
        return prisma.kegiatan.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: search,
                        },
                    },
                    {
                        ringkasan: {
                            contains: search,
                        },
                    },
                    {
                        deskripsi: {
                            contains: search,
                        },
                    },
                    {
                        lokasi: {
                            contains: search,
                        },
                    },
                    {
                        lembaga: {
                            is: {
                                nama: {
                                    contains: search,
                                },
                            },
                        },
                    },
                    {
                        Kategori: {
                            some: {
                                nama: {
                                    contains: search,
                                },
                            },
                        },
                    },
                ],
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
                kategori.forEach(async (item) => this.updateKategori(kegiatanId, item.nama));
            } else {
                result = await this.updateKategori(kegiatanId, kategori.nama);
            }
            return result;
        } catch (error) {
            console.error(error);
            return { error };
        }
    }

    static async updateKategori(id, nama) {
        return prisma.kegiatan.update({
            where: {
                id,
            },
            data: {
                Kategori: {
                    connectOrCreate: {
                        where: { nama },
                        create: { nama },
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
                                    nama: item,
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

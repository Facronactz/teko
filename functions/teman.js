import prisma from '@teko/libs/PrismaClient';

class Teman {
    static async get(id, query) {
        if (id) {
            return this.getById(id);
        }
        const {
            nama, kategori, page, sort, direction, search, beta,
        } = query;
        if (nama) {
            return this.getByNama(nama);
        }
        if (page) {
            return this.getByPage(page);
        }
        if (search) {
            if (beta) {
                return this.getBySearchBeta(search);
            }
            return this.getBySearch(search);
        }
        if (kategori) {
            return this.getByKategori(kategori);
        }
        if (sort && direction) {
            return this.getBySort(sort, direction);
        }
        return prisma.lembaga.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                owner: true,
                Kategori: true,
                Kegiatan: {
                    include: {
                        Kategori: true,
                    },
                },
            },
        });
    }

    static async getById(id) {
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

    static async getByPage(page) {
        return prisma.lembaga.findMany({
            include: {
                Kategori: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 8,
            skip: (page - 1) * 8,
        });
    }

    static async getByNama(nama) {
        return prisma.lembaga.findMany({
            where: {
                nama: {
                    contains: nama,
                },
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

    static async getBySearch(search) {
        return prisma.lembaga.findMany({
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
                        alamat: {
                            contains: search,
                        },
                    },
                    {
                        Kegiatan: {
                            some: {
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
            include: {
                owner: true,
                Kategori: true,
            },
        });
    }

    static async getBySearchBeta(search) {
        // console.log(search);
        const data = await prisma.lembaga.findMany({
            where: {
                body: {
                    search,
                },
            },
        });
        // console.log(data);
        return data;
    }

    static async getByKategori(kategori) {
        return prisma.lembaga.findMany({
            where: {
                Kategori: {
                    some: {
                        id: kategori,
                    },
                },
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

    static async getBySort(sort, direction) {
        return prisma.lembaga.findMany({
            // order by sort params
            orderBy: {
                [sort]: direction,
            },
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
        // console.log(data, owner, kategori);
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
            console.error(error);
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
            console.error(error);
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
                console.error(error);
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
                console.error(error);
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
            console.error(error);
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
            console.error(error);
            if (error.code === 'P2025') {
                return { error: 'Lembaga tidak ditemukan' };
            }
            return { error };
        }
    }
}

export default Teman;

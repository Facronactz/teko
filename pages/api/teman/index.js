import prisma from '@teko/libs/PrismaClient';

// eslint-disable-next-line no-unused-vars
const lembaga = {
    nama: 'Lembaga',
    deskripsi: 'deskripsi',
    ringkasan: 'ringkasan',
    telp: '081234567890',
    alamat: 'alamat',
    logo: 'https://via.placeholder.com/150',
};

const handler = {
    get: async (req, res) => {
        const { id } = req.query;
        if (id) {
            const data = await prisma.lembaga.findUnique({
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
            res.status(200).json(data);
        } else {
            const data = await prisma.lembaga.findMany();
            res.status(200).json(data);
        }
    },
    post: async (req, res) => {
        const { data, owner, kategori } = req.body;
        if (!data) return res.status(400).json({ message: 'Bad Request' });
        try {
            const result = await prisma.lembaga.create({
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
            const lembagaId = result.id;
            kategori.forEach(async (item) => {
                await prisma.lembaga.update({
                    where: {
                        id: lembagaId,
                    },
                    data: {
                        Kategori: {
                            connectOrCreate: {
                                where: {
                                    nama: item.nama,
                                },
                                create: {
                                    nama: item.nama,
                                },
                            },
                        },
                    },
                });
            });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: 'Bad Request' });
        try {
            await prisma.lembaga.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return res.status(200).json('Data berhasil dihapus');
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

export default function TemanHandler(req, res) {
    const { method } = req;
    try {
        handler[method.toLowerCase()](req, res);
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

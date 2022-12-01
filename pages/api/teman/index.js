import Teman from '@teko/functions/teman';

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
        const data = await Teman.get(id);
        res.status(200).json(data);
    },
    post: async (req, res) => {
        const { data, owner, kategori } = req.body;
        if (!data) return res.status(400).json({ message: 'Bad Request' });
        const result = await Teman.post(data, owner, kategori);
        console.log(result);
        if (result.error) return res.status(500).json({ success: 'false', message: result.error });
        return res.status(200).json({ message: 'Lembaga berhasil dibuat', result });
    },
    delete: async (req, res) => {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: 'Bad Request' });
        const result = await Teman.delete(id);
        if (result.error) return res.status(500).json({ success: 'false', message: result.error });
        return res.status(200).json({ message: 'Lembaga berhasil dihapus', result });
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

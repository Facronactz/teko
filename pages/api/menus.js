import Menu from '@teko/functions/menu';

// const menus = [
//     { name: 'Beranda', href: '/' },
//     { name: 'Teman', href: '/teman' },
//     { name: 'Kegiatan', href: '/kegiatan' },
// ];

export default async function handler(req, res) {
    const {
        query: { current },
        method,
        body: { data },
    } = req;
    const id = parseInt(req.query.id);
    if (method === 'GET') {
        const menus = await Menu.get(current);
        res.status(200).json(menus);
        return;
    }
    if (method === 'POST') {
        await Menu.post(data);
        res.status(201).json({ message: 'Data berhasil ditambahkan', data });
        return;
    }
    if (method === 'PUT') {
        try {
            await Menu.put(id, data);
            res.status(201).json({ message: 'Data berhasil diubah', data });
            return;
        } catch (error) {
            res.status(400).json({
                message: 'Data gagal diubah',
                error: error.message,
            });
        }
    }
    if (method === 'DELETE') {
        try {
            await Menu.delete(id);
            res.status(200).json({
                message: `Data dengan id ${id} berhasil dihapus`,
            });
        } catch (error) {
            res.status(500).json({
                message: `Data dengan id ${id} tidak ditemukan`,
                error: error.message,
            });
        }
    }
}

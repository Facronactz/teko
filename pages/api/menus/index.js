import Menu from '@teko/functions/menu';

export default async function MenusHandler(req, res) {
    const {
        query: { current },
        method,
        body: { data },
    } = req;
    const id = parseInt(req.query.id) || parseInt(req.body.id);
    if (method === 'GET') {
        const menus = await Menu.get(current);
        return res.status(200).json(menus);
    }
    if (method === 'POST') {
        await Menu.post(data);
        return res.status(201).json({ message: 'Data berhasil ditambahkan', data });
    }
    if (method === 'PUT') {
        try {
            await Menu.put(id, data);
            return res.status(201).json({ message: 'Data berhasil diubah', data });
        } catch (error) {
            return res.status(400).json({
                message: 'Data gagal diubah',
                error: error.message,
            });
        }
    }
    if (method === 'DELETE') {
        try {
            await Menu.delete(id);
            return res.status(200).json({
                message: `Data dengan id ${id} berhasil dihapus`,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: `Data dengan id ${id} tidak ditemukan`,
                error: error.message,
            });
        }
    }
    return res.status(405).json({ message: 'Method not allowed' });
}

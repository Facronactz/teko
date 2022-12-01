import Teman from '@teko/functions/teman';
import APIHandler from '@teko/functions/handler';

// const lembaga = {
//     nama: 'Lembaga',
//     deskripsi: 'deskripsi',
//     ringkasan: 'ringkasan',
//     telp: '081234567890',
//     alamat: 'alamat',
//     logo: 'https://via.placeholder.com/150',
// };

export default function TemanHandler(req, res) {
    const handler = new APIHandler(Teman, req, res);
    const { method } = req;
    try {
        handler[method.toLowerCase()]();
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

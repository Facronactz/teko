import APIHandler from '@teko/functions/handler';
import Kegiatan from '@teko/functions/kegiatan';

export default async function KegiatanHandler(req, res) {
    const handler = new APIHandler(Kegiatan, req, res);
    const { method } = req;
    try {
        handler[method.toLowerCase()]();
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

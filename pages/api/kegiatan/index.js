import Kegiatan from '@teko/functions/kegiatan';
import APIHandler from '@teko/helpers/api/handler';

export default async function KegiatanHandler(req, res) {
    const handler = new APIHandler(Kegiatan, req, res);
    const { method } = req;
    try {
        return await handler[method.toLowerCase()](req, res);
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

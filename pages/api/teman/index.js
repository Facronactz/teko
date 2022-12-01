import Teman from '@teko/functions/teman';
import APIHandler from '@teko/functions/handler';

export default function TemanHandler(req, res) {
    const handler = new APIHandler(Teman, req, res);
    const { method } = req;
    try {
        handler[method.toLowerCase()]();
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

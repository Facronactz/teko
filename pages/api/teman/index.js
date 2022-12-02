import Teman from '@teko/functions/teman';
import APIHandler from '@teko/functions/handler';

export default async function TemanHandler(req, res) {
    const handler = new APIHandler(Teman, req, res);
    const { method } = req;
    try {
        return await handler[method.toLowerCase()](req, res);
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

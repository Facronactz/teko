import APIHandler from '@teko/helpers/api/handler';
import User from '@teko/functions/users';

export default async function UserHandler(req, res) {
    const { method } = req;
    const handler = new APIHandler(User, req, res);
    try {
        return await handler[method.toLowerCase()](req, res);
    } catch (error) {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

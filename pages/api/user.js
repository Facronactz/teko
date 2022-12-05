import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
    const token = await getToken({ req });
    if (token) {
        res.status(200).json(token);
    } else {
        res.status(401);
    }
    return res.end();
}

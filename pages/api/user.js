import { assetPrefix } from '@teko/next.config';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
    const token = await getToken({ req });
    if (token) {
        // get user info from db and add it to token
        const user = await fetch(`${assetPrefix}/api/users?id=${token.sub}`);
        const data = await user.json();
        token.username = await data.username;
        token.name = await data.name;
        token.email = await data.email;
        token.role = await data.role;
        token.picture = await data.image;
        res.status(200).json(token);
    } else {
        res.status(401);
    }
    return res.end();
}

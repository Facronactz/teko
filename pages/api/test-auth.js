// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: 'You must be logged in.' });
        return;
    }

    res.status(200).json({ message: 'Success' });
}

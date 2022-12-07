import crypto from 'crypto';

export default function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
    const random = crypto.randomBytes(8).toString('hex');
    return res.status(200).send(random);
}

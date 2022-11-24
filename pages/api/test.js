/* eslint-disable no-unused-vars */
const request = {
    data: [
        { name: 'Teman', href: '/teman' },
        { name: 'Kegiatan', href: '/kegiatan' },
    ],
};

const response = {
    message: 'Data berhasil ditambahkan',
    data: [
        {
            name: 'Teman',
            href: '/teman',
        },
        {
            name: 'Kegiatan',
            href: '/kegiatan',
        },
    ],
};

export default function handler(req, res) {
    const { method } = req;
    const { data } = req.body;
    if (method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    console.log(data);
    res.status(201).json({ message: 'Data berhasil ditambahkan', data });
}

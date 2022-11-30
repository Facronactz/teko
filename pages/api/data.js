// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stats = [
    { name: 'Teman Kita', value: '1001' },
    { name: 'Kegiatan', value: '101' },
    { name: 'Relawan', value: '1052' },
    { name: 'Pengabdian', value: '55' },
];

const menus = [
    { name: 'Beranda', href: '/', current: true },
    { name: 'Teman', href: '/teman', current: false },
    { name: 'Kegiatan', href: '/kegiatan', current: false },
    { name: 'Tentang Kami', href: '/tentang-kami', current: false },
];

const team = {
    members: [
        {
            name: 'Farro Axza',
            email: 'farroaxza@gmail.com',
            github: 'https://github.com/facronactz',
            linkedin: 'https://www.linkedin.com/in/facronactz/',
            dEmail: 'f284x0682@dicoding.org ',
        },
        {
            name: 'Rifqi',
            email: 'rifqialamsyh@gmail.com',
            github: 'https://github.com/rifqialamsyh',
            linkedin: '',
            dEmail: 'rifqialamsyh@gmail.com',
        },
        {
            name: 'Radya',
            email: '',
            github: '',
            linkedin: '',
            dEmail: '@dicoding.org',
        },
        {
            name: 'Citra',
            email: '',
            github: '',
            linkedin: '',
            dEmail: '@dicoding.org',
        },
    ],
};

export default function handler(req, res) {
    const {
        query: { q },
        method,
    } = req;
    if (method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    switch (q) {
        case 'stats':
            res.status(200).json(stats);
            break;
        case 'menus':
            res.status(200).json(menus);
            break;
        case 'team':
            res.status(200).json(team);
            break;
        default:
            res.status(404).json({ message: 'Not Found' });
    }
}

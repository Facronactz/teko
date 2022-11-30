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

const team = [
    {
        name: 'Farro Axza',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'farroaxza@gmail.com',
        github: 'https://github.com/facronactz',
        linkedin: 'https://www.linkedin.com/in/facronactz/',
        dEmail: 'f284x0682@dicoding.org ',
    },
    {
        name: 'Rifqi',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'rifqialamsyh@gmail.com',
        github: 'https://github.com/rifqialamsyh',
        linkedin: 'https://www.linkedin.com/in/rifqi-alamsyah-a8a832201/',
        dEmail: 'rifqialamsyh@gmail.com',
    },
    {
        name: 'Radya',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: '',
        github: '',
        linkedin: '',
        dEmail: '@dicoding.org',
    },
    {
        name: 'Citra',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: '',
        github: '',
        linkedin: '',
        dEmail: '@dicoding.org',
    },
];

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

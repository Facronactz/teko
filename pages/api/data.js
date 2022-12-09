// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Data from '@teko/functions/data';

const menus = [
    { name: 'Beranda', href: '/', current: true },
    { name: 'Teman', href: '/teman', current: false },
    { name: 'Kegiatan', href: '/kegiatan', current: false },
    { name: 'Tentang Kami', href: '/tentang-kami', current: false },
];

const team = [
    {
        name: 'Farro Axza Febsinatra',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'farroaxza@gmail.com',
        github: 'https://github.com/facronactz',
        linkedin: 'https://www.linkedin.com/in/facronactz/',
        dEmail: 'f284x0682@dicoding.org ',
    },
    {
        name: 'Rifqi Alamsyah',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'rifqialamsyh@gmail.com',
        github: 'https://github.com/rifqialamsyh',
        linkedin: 'https://www.linkedin.com/in/rifqi-alamsyah-a8a832201/',
        dEmail: 'rifqialamsyh@gmail.com',
    },
    {
        name: 'Radya Wiguna',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/Screenshot+2022-07-24+230608.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'itsradyaandajis@gmail.com',
        github: 'https://github.com/AYNSFW/',
        linkedin: 'https://www.linkedin.com/in/muhammad-radya-4b3303256/',
        dEmail: 'F299X0772@dicoding.org',
    },
    {
        name: 'Citra Ayu Binangkit',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/team/citra.png',
        quote: 'Tailwind CSS is the only framework that Ive seen scale on large teams. Its easy to customize, adapts to any design, and the build size is tiny.',
        email: 'citrabii03@gmail.com',
        github: 'https://github.com/Citra-B',
        linkedin: 'https://www.linkedin.com/in/citra-ayu/',
        dEmail: 'F314Y0822@dicoding.org',
    },
];

export default async function handler(req, res) {
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
        res.status(200).json(await Data());
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

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
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/team/rona.png',
        quote: 'The best thing that can happen in life is life itself',
        email: 'farroaxza@gmail.com',
        github: 'https://github.com/facronactz',
        linkedin: 'https://www.linkedin.com/in/facronactz/',
        dEmail: 'f284x0682@dicoding.org ',
    },
    {
        name: 'Rifqi Alamsyah',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/team/rifqi.jpg',
        quote: 'Tak akan kuat bila sendiri, ada saatnya untuk bersama.',
        email: 'rifqialamsyh@gmail.com',
        github: 'https://github.com/rifqialamsyh',
        linkedin: 'https://www.linkedin.com/in/rifqi-alamsyah-a8a832201/',
        dEmail: 'rifqialamsyh@gmail.com',
    },
    {
        name: 'Radya Wiguna',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/team/radya.png',
        quote: 'Berusaha semaksimal mungkin walaupun usahamu terlihat sia sia, tetapi dirimu tau kalau kamu lah yang terbaik.',
        email: 'itsradyaandajis@gmail.com',
        github: 'https://github.com/AYNSFW/',
        linkedin: 'https://www.linkedin.com/in/muhammad-radya-4b3303256/',
        dEmail: 'F299X0772@dicoding.org',
    },
    {
        name: 'Citra Ayu Binangkit',
        foto: 'https://tekostorage.s3.ap-southeast-1.amazonaws.com/teko/team/citra.png',
        quote: 'Terus berubah menjadi lebih baik dan jangan pernah menyerah jika bertemu kesulitan, karena di balik kesulitan pasti akan ada kemudahan.',
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

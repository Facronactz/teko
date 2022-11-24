const menus = [
    { name: 'Beranda', href: '/' },
    { name: 'Teman', href: '/teman' },
    { name: 'Kegiatan', href: '/kegiatan' },
];

export default function handler(req, res) {
    const {
        query: { current },
        method,
    } = req;
    if (method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    if (current) {
        menus.forEach((menu) => {
            if (menu.name === current) {
                menu.current = true;
            } else {
                menu.current = false;
            }
        });
    }
    res.status(200).json(menus);
}

const menus = [
    { name: 'Beranda', href: '/', current: false },
    { name: 'Teman', href: '/teman', current: false },
    { name: 'Kegiatan', href: '/kegiatan', current: false },
];

export default function handler(req, res) {
    const {
        query: { current },
        method,
    } = req;
    if (method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
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

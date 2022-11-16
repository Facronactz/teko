// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stats = [
    { name: "Teman Kita", value: "1001" },
    { name: "Kegiatan", value: "101" },
    { name: "Relawan", value: "1052" },
    { name: "Pengabdian", value: "55" },
];

const menus = [
    { name: "Beranda", href: "#", current: true },
    { name: "Teman", href: "#", current: false },
    { name: "Kegiatan", href: "#", current: false },
];

export default function handler(req, res) {
    const {query: {q}, method} = req;
    if (method !== "GET") {
        res.status(405).json({message: "Method not allowed"});
    }
    switch (q) {
        case "stats":
            res.status(200).json(stats);
            break;
        case "menus":
            res.status(200).json(menus);
            break;
        default:
            res.status(404).json({message: "Not Found"});
    }
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function postData(data) {
    await prisma.menu.createMany({
        data,
    });
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    const { data } = req.body;
    postData(data)
        .then(async () => {
            await prisma.$disconnect();
        })
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
    res.status(201).json({ message: 'Data berhasil ditambahkan', data });
}

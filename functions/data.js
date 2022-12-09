import prisma from '@teko/libs/PrismaClient';

export default async function Data() {
    const Teman = await prisma.lembaga.count();
    const Kegiatan = await prisma.kegiatan.count();
    const Pengguna = await prisma.user.count();
    const data = [
        { name: 'Teman Kita', value: Teman },
        { name: 'Kegiatan', value: Kegiatan },
        { name: 'Pengguna', value: Pengguna },
    ];
    // console.log(data);
    return data;
}

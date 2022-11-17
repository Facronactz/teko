import { prisma } from './prismaClient';

const extractData = (stats) => {
    const data = [];
    Object.keys(stats[0]).forEach((key) => {
        if (key !== 'id' && key !== 'date') {
            const obj = {};
            obj.name = key;
            obj.value = stats[0][key];
            data.push(obj);
        }
    });
    return data;
};

async function getData() {
    const stats = await prisma.stats.findMany();
    const data = extractData(stats);
    console.log(data);
    return data;
}

async function handler(req, res) {
    const stats = await getData();
    res.status(200).json(stats);
}
export default handler;

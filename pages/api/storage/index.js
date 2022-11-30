import Storage from '@teko/functions/storage';

export default async function StorageHandler(req, res) {
    const { method } = req;
    if (method === 'GET') {
        const data = await Storage.get();
        res.status(200).json(data);
    } else if (method === 'POST') {
        const data = await Storage.post(req.query.file);
        res.status(200).json(data);
    } else if (method === 'DELETE') {
        await Storage.delete(req.body.item);
        res.status(200).json({ message: 'Success delete item', item: req.body.item });
    } else {
        res.status(400).json({ message: 'Bad Request' });
    }
}

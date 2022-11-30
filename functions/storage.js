import s3 from '@teko/libs/S3Client';
import { DeleteObjectCommand, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class Storage {
    static async get(id) {
        const datas = await s3.send(new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
        }));
        if (id) {
            const item = datas.Contents.find((data) => data.Key === id);
            return item;
        }
        return datas.Contents;
    }

    static async post(id) {
        const url = await getSignedUrl(s3, new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: id,
        }), { expiresIn: 120 });
        return url;
    }

    static async delete(id) {
        const res = await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: id,
        }));
        return res;
    }
}

export default Storage;

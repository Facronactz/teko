import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_REGION_ID,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});
export default s3;

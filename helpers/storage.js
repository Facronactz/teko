import { useState } from 'react';

const getUploadUrl = async (fileName) => {
    const res = await fetch(`/api/storage?file=teko/${fileName}`, {
        method: 'POST',
    });
    return res.json();
};

const uploadtoStorage = async (url, body) => {
    const res = await fetch(url, {
        method: 'PUT',
        body,
    });
    return res.ok;
};

export default async function useUpload(file) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');

    setLoading(true);
    const fileName = encodeURIComponent(file.name);

    const url = await getUploadUrl(fileName);
    const upload = await uploadtoStorage(url, file);

    const imageURL = `${process.env.STORAGE_URL}/${fileName}`;

    if (upload) {
        setName(imageURL);
        setLoading(false);
    } else {
        setError('Something went wrong');
        setLoading(false);
    }

    return { loading, name, error };
}

export { getUploadUrl, uploadtoStorage };

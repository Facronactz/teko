'use client';

import { useState } from 'react';
import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';

export default function Upload() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  const uploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files?.[0];
    const fileName = encodeURIComponent(file.name);

    const url = await getUploadUrl(fileName);
    const upload = await uploadtoStorage(url, file);

    const imageURL = `${process.env.STORAGE_URL}/teko/${fileName}`;

    if (upload) {
      setName(imageURL);
      setLoading(false);
    } else {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <p>Upload a .png or .jpg image (max 3MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
      {error && <p>{error}</p>}
      {loading && <p>Uploading...</p>}
      {name && <p>Uploaded!</p>}
      {name && <img src={name} alt={name} />}
    </>
  );
}

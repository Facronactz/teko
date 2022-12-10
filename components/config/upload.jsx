import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';
import { useState } from 'react';

export default function UploadImage({ id, type }) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  const uploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files?.[0];

    const url = await getUploadUrl(`${type}/${id}`);
    const upload = await uploadtoStorage(url, file);

    const imageURL = `${process.env.STORAGE_URL}/teko/${type}/${id}`;

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
      <p>Ubah Foto (max 3MB).</p>
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

'use client';

import { useState } from 'react';

const getUploadUrl = async (fileName) => {
  const res = await fetch(`http://localhost:3000/api/storage?file=${fileName}`, {
    method: 'POST',
  });
  return res.json();
};

const uploadtoS3 = async (url, body) => {
  const res = await fetch(url, {
    method: 'PUT',
    body,
  });
  return res.ok;
};

export default function Upload() {
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');

  const uploadPhoto = async (e) => {
    setUploading(true);
    const file = e.target.files?.[0];
    const fileName = encodeURIComponent(file.name);

    const url = await getUploadUrl(fileName);
    const upload = await uploadtoS3(url, file);

    const imageURL = `${process.env.STORAGE_URL}/${fileName}`;

    if (upload) {
      setName(imageURL);
      setUploading(false);
      setUploaded(true);
    } else {
      setUploaded(false);
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
      {uploading && <p>Uploading...</p>}
      {uploaded && <p>Uploaded!</p>}
      {name && <img src={name} alt={name} />}
    </>
  );
}

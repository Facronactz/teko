'use client';

import Link from 'next/link';

import { Container, Button } from 'react-bootstrap';

import { useState } from 'react';
import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';

// TODO @vang rona, belum memiliki fungsi & logika sama sekali
// FIXME buat yang password bingung klo pake state nanti di react component in

export default function EditTeman() {
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
      <Container className="grid md:grid-cols-2 gap-3 justify-center">
        <Link
          href={'/'}
          className="block no-underline p-4 bg-white border-2 border-brand text-brand text-center font-semibold mb-10 rounded mt-3"
        >
          Kembali
        </Link>
        <Link
          href={'/dashboard/user/new'}
          className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10 rounded mt-3"
        >
          Buat "Teman"
        </Link>
      </Container>

      <Container className="m-auto">
        <form className="grid">
          <label className="font-semibold">Nama:</label>
          <input
            className="border border-brand my-2 rounded px-2 py-1"
            type="text"
            id="nama"
            name="nama"
          />

          <label className="my-3 font-semibold">Username:</label>
          <input
            className="border border-brand rounded mb-3 px-2 py-1"
            name="username"
            type="text"
            id="username"
          ></input>
          <label className="mb-3 font-semibold">Email:</label>
          <input
            className="border border-brand rounded mb-3 px-2 py-1"
            name="email"
            id="email"
            type="text"
          ></input>
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

          <Button
            type="submit"
            className="my-3 font-semibold text-lg bg-brand border-brand py-3"
          >
            Kirim
          </Button>
        </form>
      </Container>
      <Container className="flex flex-col">
        <Button className="bg-white border-brand text-brand">
          Ubah Password
        </Button>
        <form action="" id="change-pass" className="flex flex-col">
          <label className="my-3 font-semibold">Password Lama:</label>
          <input
            className="border border-brand rounded mb-3 px-2 py-1"
            name="username"
            type="text"
            id="username"
          ></input>
          <label className="my-3 font-semibold">Password Baru:</label>
          <input
            className="border border-brand rounded mb-3 px-2 py-1"
            name="username"
            type="text"
            id="username"
          ></input>
          <label className="my-3 font-semibold">
            Konfirmasi Password Baru:
          </label>
          <input
            className="border border-brand rounded mb-3 px-2 py-1"
            name="username"
            type="text"
            id="username"
          ></input>
        </form>
      </Container>
    </>
  );
}

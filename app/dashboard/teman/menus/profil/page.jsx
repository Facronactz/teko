'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Container, Button } from 'react-bootstrap';

// TODO masih UI belum ada fungsi sama sekali (ubah berdasar id(karena dashboard teman), fungsi put(edit) profil blm berfungsi)

const getUploadUrl = async (fileName) => {
  const res = await fetch(
    `http://localhost:3000/api/storage?file=${fileName}`,
    {
      method: 'POST',
    }
  );
  return res.json();
};

const uploadtoS3 = async (url, body) => {
  const res = await fetch(url, {
    method: 'PUT',
    body,
  });
  return res.ok;
};

export default function ProfilPage() {
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
      <Link
        href={'/dashboard/teman'}
        className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
      >
        Kembali
      </Link>
      <Container>
        <form className="grid" action="/send-data-here" method="post">
          <label for="first" className="font-semibold">
            Nama:
          </label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="first"
            name="first"
          />
          <label for="last" className="font-semibold">
            No Telepon:
          </label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="last"
            name="last"
          />
          <label className="mb-2 font-semibold">Kategori:</label>
          <label for="kategori1">
            {' '}
            Kemanusiaan
            <input
              type="checkbox"
              id="kategori1"
              name="kategori1"
              value="Kemanusiaan"
              className=""
            />
          </label>

          <label for="kategori2">
            {' '}
            Sosial
            <input
              type="checkbox"
              id="kategori2"
              name="kategori2"
              value="Sosial"
              className=""
            />
          </label>

          <label for="kategori3">
            {' '}
            Lingkungan
            <input
              type="checkbox"
              id="kategori3"
              name="kategori3"
              value="Lingkungan"
              className=""
            />
          </label>

          <label for="ringkasan" className="my-3 font-semibold">
            Ringkasan:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
          ></textarea>
          <label for="deskripsi" className="mb-3 font-semibold">
            Deskripsi:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
          ></textarea>
          <label for="alamat" className="mb-3 font-semibold">
            Alamat:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
          ></textarea>

          <p className="font-semibold">Ubah Logo (max 3MB).</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
          {uploading && <p>Uploading...</p>}
          {uploaded && <p>Uploaded!</p>}
          {name && <img src={name} alt={name} />}

          <Button
            type="submit"
            className="my-3 font-semibold text-lg bg-brand border-brand py-3"
          >
            Ubah
          </Button>
        </form>
      </Container>
    </>
  );
}


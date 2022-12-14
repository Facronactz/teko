'use client';

import Link from 'next/link';

import { useState } from 'react';
import { assetPrefix } from '@teko/next.config';

import { Container, Button } from 'react-bootstrap';

const getUploadUrl = async (fileName) => {
  const res = await fetch(`${assetPrefix}/api/storage?file=${fileName}`, {
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

export default function KegiatanPage() {
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
          <label htmlFor="first" className="font-semibold">
            Nama Kegiatan:
          </label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="first"
            name="first"
          />
          <label className="mb-2 font-semibold">Kategori:</label>
          <label htmlFor="kategori1">
            Kemanusiaan
            <input
              type="checkbox"
              id="kategori1"
              name="kategori1"
              value="Kemanusiaan"
              className=""
            />
          </label>

          <label htmlFor="kategori2">
            Sosial
            <input
              type="checkbox"
              id="kategori2"
              name="kategori2"
              value="Sosial"
              className=""
            />
          </label>

          <label htmlFor="kategori3">
            Lingkungan
            <input
              type="checkbox"
              id="kategori3"
              name="kategori3"
              value="Lingkungan"
              className=""
            />
          </label>

          <label htmlFor="ringkasan" className="my-3 font-semibold">
            Ringkasan:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
          ></textarea>
          <label htmlFor="deskripsi" className="mb-3 font-semibold">
            Deskripsi:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            type="textarea"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
          ></textarea>
          <label className="mb-3 font-semibold" htmlFor="tanggal">
            Tanggal Pelaksanaan:
          </label>
          <input
            className="border border-brand rounded mb-3 px-2"
            type="datetime-local"
            id="tanggal"
            name="tanggal"
          ></input>
          <label htmlFor="alamat" className="mb-3 font-semibold">
            Lokasi:
          </label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
          ></textarea>

          <p className="font-semibold">Tambah Banner (max 3MB).</p>
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
            Tambah
          </Button>
        </form>
      </Container>
    </>
  );
}

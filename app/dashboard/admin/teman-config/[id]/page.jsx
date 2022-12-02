'use client';

import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';

import { use, useState, useRef } from 'react';
import { assetPrefix } from '@teko/next.config';

const getUploadUrl = async (fileName) => {
  const res = await fetch(`${assetPrefix}/api/storage?file=${fileName}`, {
    cache: 'no-cache',
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

const getTeman = async (id) => {
  const data = await fetch(`${assetPrefix}/api/teman?id=${id}`);
  return data.json();
};

const uploadtoChange = async (data) => {
  const res = await fetch(`${assetPrefix}/api/teman`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const data2 = await res.json();
  return data2;
};

export default function TampilTeman({ params }) {
  const teman = use(getTeman(params.id));

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

  const idRef = useRef();
  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const teleponRef = useRef();
  const alamatRef = useRef();
  const logoRef = useRef();

  async function onSubmit(e) {
    e.preventDefault();
    const data = {
      id: idRef.current.value,
      data: {
        nama: namaRef.current.value,
        deskripsi: deskripsiRef.current.value,
        ringkasan: ringkasanRef.current.value,
        telp: teleponRef.current.value,
        alamat: alamatRef.current.value,
        logo: logoRef.current.value,
      },
    };
    const uploadData = await uploadtoChange(data);
    console.log(await uploadData);
  }

  return (
    <>
      <Link
        href={'/dashboard/admin/teman-config'}
        className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
      >
        Kembali
      </Link>
      <Container className="m-auto">
        <form onSubmit={onSubmit} className="grid">
          <label className="font-semibold">id:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="first"
            name="first"
            defaultValue={teman.id}
            ref={idRef}
            disabled
          />
          <label className="font-semibold">Nama:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="first"
            name="first"
            defaultValue={teman.nama}
            ref={namaRef}
          />
          <label className="font-semibold">No Telepon:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="number"
            id="last"
            name="last"
            defaultValue={teman.telp}
            ref={teleponRef}
          />

          <label className="my-3 font-semibold">Ringkasan:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
            defaultValue={teman.ringkasan}
            ref={ringkasanRef}
          ></textarea>
          <label className="mb-3 font-semibold">Deskripsi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
            defaultValue={teman.deskripsi}
            ref={deskripsiRef}
          ></textarea>
          <label className="mb-3 font-semibold">Alamat:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
            defaultValue={teman.alamat}
            ref={alamatRef}
          ></textarea>

          <p className="font-semibold">Ubah Logo (max 3MB).</p>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="logoURL"
            name="logoURL"
            defaultValue={teman.logo}
            ref={logoRef}
          />
          <p>atau</p>
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
            Kirim
          </Button>
        </form>
      </Container>
    </>
  );
}

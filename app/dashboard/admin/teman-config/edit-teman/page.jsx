'use client';

import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import Link from 'next/link';

import { useState } from 'react';
import { assetPrefix } from '@teko/next.config';

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

const getTeman = async (id) => {
  const data = await fetch(`${assetPrefix}/api/teman?id=${id}`);
  return data.json();
};

export default function TampilTeman() {
  // const temans = use(getTeman(params.id));

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
        href={'/dashboard/admin/teman-config'}
        className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
      >
        Kembali
      </Link>
      <Container className="m-auto">
        {/* <Form.Label>ID</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="id"
            aria-label="id"
            aria-describedby="id-addon2"
          />
          <Button variant="outline-secondary" id="button-id">
            Button
          </Button>
        </InputGroup> */}
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">id</InputGroup.Text>
          <Form.Control
            // value={`${teman.id}`}
            placeholder="10210ji1dj81d2111-2"
            aria-label="id"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Nama</InputGroup.Text>
          <Form.Control placeholder="Lemabaga A" aria-label="nama" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Deskripsi</InputGroup.Text>
          <Form.Control as="textarea" aria-label="Deskripsi" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Ringkasan</InputGroup.Text>
          <Form.Control as="textarea" aria-label="Ringkasan" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Telepon</InputGroup.Text>
          <Form.Control placeholder="080000000" aria-label="telepon" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Alamat</InputGroup.Text>
          <Form.Control as="textarea" aria-label="alamat" />
        </InputGroup>
        <Form.Label htmlFor="logo-url">Logo</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="logo">logo url</InputGroup.Text>
          <Form.Control id="logo-url" />
        </InputGroup>
        <Form.Label>atau</Form.Label>
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        />
        {uploading && <p>Uploading...</p>}
        {uploaded && <p>Uploaded!</p>}
        {name && <img src={name} alt={name} />}
      </Container>
      <Container className="mt-10">
        <Button className="bg-brand border-brand px-4" size="lg">
          Kirim
        </Button>
      </Container>
    </>
  );
}


'use client';

import Link from 'next/link';

import { useState, useRef } from 'react';

import Fetcher from '@teko/helpers/fetcher';
import { Container, Button } from 'react-bootstrap';
import useSWR from 'swr';

import TagsInput from 'react-tagsinput';

// TODO post belum fungsi sama sekali, untuk post semua input blm ada classnya
const temanFetcher = new Fetcher('teman');
const userFetcer = new Fetcher('user');

export default function KegiatanPage() {
  const { data: user } = useSWR(userFetcer.url, userFetcer.fetcher);

  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const teleponRef = useRef();
  const alamatRef = useRef();
  const [tags, setTags] = useState([]);

  const handleChange = (tag) => {
    setTags(tag);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const kategori = tags.map((tag) => ({ nama: tag }));
    const data = {
      nama: namaRef.current.value,
      deskripsi: deskripsiRef.current.value,
      ringkasan: ringkasanRef.current.value,
      telp: teleponRef.current.value,
      alamat: alamatRef.current.value,
      logo: '',
      kategori,
      owner: user.sub,
    };
    await temanFetcher.post(data);
  };

  return (
    <>
      <Link
        href={'/dashboard/admin/teman-config'}
        className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
      >
        Kembali
      </Link>
      <Container>
        <form className="grid" onSubmit={onSubmit}>
          {/* Kan inima nambah teman dari admin bukan user, jadi pasti tau idnya */}
          {/* <label htmlFor="first" className="font-semibold">
            Owner Id:
          </label>
          <input
            className="border border-brand my-2 rounded p-2"
            type="text"
            id="first"
            name="first"
          /> */}
          <label className="font-semibold">Nama Organisasi:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="nama"
            name="nama"
            ref={namaRef}
          />
          <label className="my-3 font-semibold">Ringkasan:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
            ref={ringkasanRef}
          ></textarea>
          <label className="mb-3 font-semibold">Deskripsi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
            ref={deskripsiRef}
          ></textarea>
          <label className="mb-3 font-semibold">Alamat:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
            ref={alamatRef}
          ></textarea>
          <label className="font-semibold">No Telepon:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="number"
            id="last"
            name="last"
            ref={teleponRef}
          />
          <label className="mb-2 font-semibold">Kategori:</label>
          <TagsInput value={tags} onChange={handleChange} />
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

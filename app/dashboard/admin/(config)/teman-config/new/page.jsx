'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import Fetcher from '@teko/helpers/fetcher';
import { Container, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Swal from 'sweetalert2';

import TagsInput from 'react-tagsinput';

// TODO post belum fungsi sama sekali, untuk post semua input blm ada classnya
const temanFetcher = new Fetcher('teman');
const userFetcer = new Fetcher('user');

export default function KegiatanPage() {
  const { data: user } = useSWR(userFetcer.url, userFetcer.fetcher);
  const router = useRouter();

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
    if (!namaRef.current.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama Organisasi tidak boleh kosong',
        confirmButtonColor: '#315343',
      });
      return;
    }
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
    Swal.fire({
      icon: 'success',
      title: 'Yaay...',
      text: 'Data berhasil ditambahkan',
      confirmButtonColor: '#315343',
    });
    router.push('/dashboard/admin/teman-config');
  };

  return (
    <>
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

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Container, Button } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import Swal from 'sweetalert2';

export default function NewKegiatan({ fetcher, lembaga }) {
  const router = useRouter();
  // Ref
  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const lokasiRef = useRef();
  const tanggalRef = useRef();

  const [tags, setTags] = useState([]);
  const handleChange = (tag) => {
    setTags(tag);
  };
  // Handle on submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!namaRef.current.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama Kegiatan tidak boleh kosong',
        confirmButtonColor: '#315343',
      });
      return;
    }
    const kategori = tags.map((tag) => ({ nama: tag }));
    const data = {
      nama: namaRef.current.value,
      deskripsi: deskripsiRef.current.value,
      ringkasan: ringkasanRef.current.value,
      lokasi: lokasiRef.current.value,
      tanggal: tanggalRef.current.value,
      banner: '',
      kategori,
      lembaga,
    };
    await fetcher.post(data);
    Swal.fire({
      icon: 'success',
      title: 'Yaay...',
      text: 'Data berhasil ditambahkan',
      confirmButtonColor: '#315343',
    });
    router.refresh();
  };

  return (
    <>
      <Container>
        <form className="grid" onSubmit={onSubmit}>
          <label className="font-semibold">Nama Kegiatan:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="nama"
            name="nama"
            ref={namaRef}
            required
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
          <label className="mb-3 font-semibold">Lokasi:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="last"
            name="last"
            ref={lokasiRef}
          />
          {/* Tanggal */}
          <label className="mb-3 font-semibold">Tanggal:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="date"
            id="last"
            name="last"
            ref={tanggalRef}
            required
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

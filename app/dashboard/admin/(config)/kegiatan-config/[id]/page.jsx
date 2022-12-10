'use client';

import { Container, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState, useRef, useEffect } from 'react';
import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Image from 'next/image';
import Swal from 'sweetalert2';
import LoadingX from '@teko/components/loading';
import TagsInput from 'react-tagsinput';

export default function EditKegiatan({ params }) {
  const kegiatanFetcher = new Fetcher({
    id: params.id,
    url: 'kegiatan',
  });

  const router = useRouter();
  const { data } = useSWR(kegiatanFetcher.url, kegiatanFetcher.fetcher);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [banner, setBanner] = useState(null);

  const uploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files?.[0];
    const fileName = `kegiatan/${params.id}`;

    const url = await getUploadUrl(fileName);
    const upload = await uploadtoStorage(url, file);

    const imageURL = `${process.env.STORAGE_URL}/teko/${fileName}`;

    if (upload) {
      setBanner(imageURL);
      setLoading(false);
    } else {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const lokasiRef = useRef();
  const bannerRef = useRef();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (data) {
      const kategori = data.Kategori.map((tag) => tag.nama);
      setTags(kategori);
    }
  }, [data]);

  const handleChangeKategori = (tag) => {
    setTags(tag);
  };

  async function onSubmit(e) {
    e.preventDefault();
    // konfirmasi
    const swal = await Swal.fire({
      title: 'Simpan data',
      text: 'Kamu tidak bisa mengembalikan apa yang telah diubah!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, simpan!',
    });
    // jika terkonfirmasi
    if (swal.isConfirmed) {
      // ambil data dari UI
      const upload = {
        nama: namaRef.current.value,
        deskripsi: deskripsiRef.current.value,
        ringkasan: ringkasanRef.current.value,
        lokasi: lokasiRef.current.value,
        banner: bannerRef.current.value,
        kategori: tags,
      };
      // upload data
      const resp = await kegiatanFetcher.put(upload);
      // jika berhasil
      if (!resp.error) {
        const ok = await Swal.fire({
          icon: 'success',
          title: 'Yaay...',
          text: 'File berhasil disimpan',
          confirmButtonColor: '#315343',
        });
        // tunggu user untuk menutup swal
        if (ok.isConfirmed) {
          // refresh halaman jika berhasil edit
          router.refresh();
        }
        // jika gagal
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File tidak berhasil disimpan',
          // bisa ditambahkan error message dari api
          // text: resp.error.message,
          confirmButtonColor: '#315343',
        });
      }
    }
  }

  if (error) {
    return (
      <Alert className="m-0" key="danger" variant="danger">
        Terjadi kesalahan saat mengambil data
      </Alert>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-center h-[90vh]">
        <div className="my-auto">
          <LoadingX />
        </div>
      </div>
    );
  }
  return (
    <>
      <Container className="m-auto">
        <Image
          className="rounded-3 center mx-auto aspect-video object-cover object-center"
          width={300}
          height={150}
          src={data.banner}
          alt={data.nama}
          onClick={() => router.refresh()}
        />
        {/* tampilkan id sebagai text biasa yang tidak bisa diedit buat di tengah */}
        {/* <h1 className="text-2xl font-semibold text-center">{data.id}</h1> */}
        <p className="text-lg text-gray-500 text-center">ID: {data.id}</p>
        <form onSubmit={onSubmit} className="grid">
          <label className="font-semibold">Nama:</label>
          <input
            className="border border-brand my-2 rounded px-2 py-1"
            type="text"
            id="nama"
            name="nama"
            defaultValue={data.nama}
            ref={namaRef}
          />
          <label className="font-semibold">Active:</label>
          <input
            className="border border-brand my-2 rounded   "
            type="checkbox"
            id="active"
            name="active"
            defaultChecked={data.active}
          />

          <label className="my-3 font-semibold">Ringkasan:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2 py-1"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
            defaultValue={data.ringkasan}
            ref={ringkasanRef}
          ></textarea>
          <label className="mb-3 font-semibold">Deskripsi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2 py-1"
            type="textarea"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
            defaultValue={data.deskripsi}
            ref={deskripsiRef}
          ></textarea>
          <label className="mb-3 font-semibold">Lokasi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2 py-1"
            name="lokasi"
            id="lokasi"
            cols="5"
            rows="2"
            defaultValue={data.lokasi}
            ref={lokasiRef}
          ></textarea>

          <label className="mb-2 font-semibold">Kategori:</label>
          <TagsInput value={tags} onChange={handleChangeKategori} />

          <p className="font-semibold mt-3">Ubah Banner (max 3MB).</p>
          <input
            className="border border-brand my-1 rounded px-2 py-1"
            type="text"
            id="bannerURL"
            name="bannerURL"
            defaultValue={data.banner}
            ref={bannerRef}
          />
          <p className="mt-3">atau</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
          {error && <p>{error}</p>}
          {loading && <p>Uploading...</p>}
          {banner && <p>Uploaded!</p>}

          <Button
            type="submit"
            className="my-3 font-semibold text-lg bg-brand border-brand py-3 px-1"
          >
            Simpan
          </Button>
        </form>
      </Container>
    </>
  );
}

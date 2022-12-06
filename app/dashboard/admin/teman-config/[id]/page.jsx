'use client';

import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState, useRef } from 'react';
import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Image from 'next/image';
import Swal from 'sweetalert2';
import LoadingX from '@teko/components/loading';

export default function TampilTeman({ params }) {
  const temanFetcher = new Fetcher({
    id: params.id,
    url: `teman?id=${params.id}`,
  });

  const router = useRouter();
  const { data } = useSWR(temanFetcher.url, temanFetcher.fetcher);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);

  const uploadPhoto = async (e) => {
    setLoading(true);
    const file = e.target.files?.[0];
    const fileName = `teman/${params.id}`;

    const url = await getUploadUrl(fileName);
    const upload = await uploadtoStorage(url, file);

    const imageURL = `${process.env.STORAGE_URL}/teko/${fileName}`;

    if (upload) {
      setLogo(imageURL);
      setLoading(false);
    } else {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const teleponRef = useRef();
  const alamatRef = useRef();
  const logoRef = useRef();

  async function onSubmit(e) {
    e.preventDefault();
    const swal = await Swal.fire({
      // TODO ganti ke bahasa indo
      title: 'Simpan data',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
    });
    if (swal.isConfirmed) {
      const upload = {
        nama: namaRef.current.value,
        deskripsi: deskripsiRef.current.value,
        ringkasan: ringkasanRef.current.value,
        telp: teleponRef.current.value,
        alamat: alamatRef.current.value,
        logo: logoRef.current.value,
      };
      const resp = await temanFetcher.put(upload);
      if (!resp.error) {
        Swal.fire(
          'Tersimpan!',
          'Your file has been simpaned.',
          'success',
        );
      } else {
        Swal.fire(
          'Gagal!',
          'Your file has not been simpaned.',
          'error',
        );
      }
    }
  }

  // TODO buat loading dan error
  if (error) return <div>failed to load</div>;
  if (!data) return <LoadingX />;
  return (
    <>
      <Link
        href={'/dashboard/admin/teman-config'}
        className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
      >
        Kembali
      </Link>
      <Container className="m-auto">
        <Image width={150} height={150} src={data.logo} alt={data.nama} onClick={() => router.refresh()} />
        <form onSubmit={onSubmit} className="grid">
          <label className="font-semibold">Nama:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="first"
            // FIXME ini name apaan?
            name="first"
            defaultValue={data.nama}
            ref={namaRef}
          />
          <label className="font-semibold">No Telepon:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="number"
            id="last"
            name="last"
            defaultValue={data.telp}
            ref={teleponRef}
          />

          <label className="my-3 font-semibold">Ringkasan:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
            defaultValue={data.ringkasan}
            ref={ringkasanRef}
          ></textarea>
          <label className="mb-3 font-semibold">Deskripsi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
            defaultValue={data.deskripsi}
            ref={deskripsiRef}
          ></textarea>
          <label className="mb-3 font-semibold">Alamat:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
            defaultValue={data.alamat}
            ref={alamatRef}
          ></textarea>

          <p className="font-semibold">Ubah Logo (max 3MB).</p>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="logoURL"
            name="logoURL"
            defaultValue={data.logo}
            ref={logoRef}
          />
          <p>atau</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
          {error && <p>{error}</p>}
          {/* TODO ganti loading */}
          {loading && <p>Uploading...</p>}
          {logo && <p>Uploaded!</p>}

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

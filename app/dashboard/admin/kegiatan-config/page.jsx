// TODO
// page kegiatan config sama kyk teman konfig namun tidak bisa tambah kegiatan
// cuman bisa edit kegiatan karena dia butuh id lembaga

'use client';

import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';
import Link from 'next/link';

export default function KegiatanConfig() {
  const kegiatanFetcher = new Fetcher('kegiatan');
  const { data: kegiatans } = useSWR(kegiatanFetcher.url, kegiatanFetcher.fetcher);

  if (!kegiatans) return <>Loading....</>;

  return (
    <>
      <div className='container'>
        <h1 className="font-semibold text-2xl mb-4">Kegiatan</h1>
        <Link className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10" href={'/dashboard/admin/kegiatan-config/new'}>
          Tambah Kegiatan
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kegiatans?.map((kegiatan) => (
            <Link className="block bg-white rounded shadow p-4" key={kegiatan.id} href={`/dashboard/admin/kegiatan-config/${kegiatan.id}`}>
              <h2 className="font-semibold text-xl">{kegiatan.nama}</h2>
              <p className="text-gray-600">{kegiatan.deskripsi}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

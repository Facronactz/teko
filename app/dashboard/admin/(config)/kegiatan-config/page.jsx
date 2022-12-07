'use client';

import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';
import Link from 'next/link';
import SideBar from '@teko/components/sidebar';

import { Dropdown } from 'react-bootstrap';

export default function KegiatanConfig() {
  const kegiatanFetcher = new Fetcher('kegiatan');
  const { data: kegiatans } = useSWR(
    kegiatanFetcher.url,
    kegiatanFetcher.fetcher,
  );

  if (!kegiatans) return <>Loading....</>;

  return (
    <>
      <SideBar className="col" current="kegiatan" role="admin" />

      <div className="container w-full xl:ml-52 mr-10 p-4 xl:w-[85%] h-full">
        <h1 className="font-semibold text-2xl mb-4">Kegiatan</h1>
        <Link
          className="block no-underline p-4 bg-brand text-white text-center font-semibold mb-10"
          href={'/dashboard/admin/kegiatan-config/new'}
        >
          Tambah Kegiatan
        </Link>
        <Dropdown className="mb-3">
          <Dropdown.Toggle
            className="bg-brand border-brand"
            id="dropdown-basic"
          >
            Pilih Teman
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kegiatans?.map((kegiatan) => (
            <Link
              className="block bg-white rounded shadow p-4 no-underline text-brand"
              key={kegiatan.id}
              href={`/dashboard/admin/kegiatan-config/${kegiatan.id}`}
            >
              <h2 className="font-semibold text-xl ">
                Edit kegiatan {kegiatan.nama}
              </h2>
              <p className="font-light text-lg ">{kegiatan.deskripsi}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

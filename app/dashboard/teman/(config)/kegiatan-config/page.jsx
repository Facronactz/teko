'use client';

import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';
import Link from 'next/link';
import SideBar from '@teko/components/sidebar';

import { Dropdown } from 'react-bootstrap';
import LoadingX from '@teko/components/loading';
import KegiatanItemConfig from '@teko/components/config/kegiatan/kegiatan';

export default function KegiatanConfig() {
  const kegiatanFetcher = new Fetcher('kegiatan');
  const { data: kegiatans } = useSWR(
    kegiatanFetcher.url,
    kegiatanFetcher.fetcher,
  );

  if (!kegiatans) return <LoadingX />;

  return (
    <>
      <div className="flex row m-3 gap-3">
        <SideBar className="col" current="kegiatan" role="admin" />
        <section className="w-full col h-full p-0">
          <h1 className="font-semibold text-2xl mb-4">Kegiatan</h1>
          <Link
            className="block no-underline px-4 py-2 bg-brand text-white text-lg rounded text-center mb-10"
            href={'/dashboard/admin/kegiatan-config/new'}
          >
            Tambah Kegiatan
          </Link>
          {/* TODO ini didisabledulubuatrecord */}
          {/* <Dropdown className="mb-3">
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
          </Dropdown> */}
          <KegiatanItemConfig lembaga={true} data={kegiatans} />
        </section>
      </div>
    </>
  );
}

'use client';

import Fetcher from '@teko/helpers/fetcher';
import LoadingX from '@teko/components/loading';
import KegiatanItemConfig from '@teko/components/config/kegiatan/list';
import useSwr from 'swr';
import { useState } from 'react';
import NewKegiatan from './new';

export default function Page({ params }) {
  const fetcher = new Fetcher({
    url: `kegiatan?lembaga=${params.id}&all=true`,
  });
  const { data: kegiatan } = useSwr(
    fetcher.url,
    fetcher.fetcher,
    fetcher.swrConfig,
  );

  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };

  if (!kegiatan) return <LoadingX />;

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => showHandler()}
          className=" bg-brand text-white text-lg px-3 py-2 mb-3 mx-3 rounded w-full"
        >
          {show ? 'List' : 'Tambah'} Kegiatan
        </button>
      </div>
      {show && <NewKegiatan lembaga={params.id} fetcher={fetcher} />}
      {show || <KegiatanItemConfig role='admin' data={kegiatan} />}
    </>
  );
}

'use client';

import Fetcher from '@teko/helpers/fetcher';
import LoadingX from '@teko/components/loading';
import KegiatanItemConfig from '@teko/components/config/kegiatan';
import useSwr from 'swr';
import { useState } from 'react';
import NewKegiatan from './new';

export default function Page({ params }) {
  const fetcher = new Fetcher({
    url: `kegiatan?lembaga=${params.id}`,
  });
  const { data: kegiatan } = useSwr(fetcher.url, fetcher.fetcher, fetcher.swrConfig);

  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };

  if (!kegiatan) return <LoadingX />;

  return (
    <>
      {/* TODO style button tambah kegiatan */}
      <button onClick={() => showHandler()}>{show ? 'List' : 'Tambah'} Kegiatan</button>
      {show && <NewKegiatan lembaga={params.id} fetcher={fetcher} />}
      {show || <KegiatanItemConfig data={kegiatan} />}
    </>
  );
}

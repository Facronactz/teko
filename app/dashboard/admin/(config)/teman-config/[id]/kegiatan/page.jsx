'use client';

import Fetcher from '@teko/helpers/fetcher';
import LoadingX from '@teko/components/loading';
import KegiatanItemConfig from '@teko/components/config/kegiatan';
import useSwr from 'swr';

export default function Page({ params }) {
  const fetcher = new Fetcher({
    url: `kegiatan?lembaga=${params.id}`,
  });
  const { data: kegiatan } = useSwr(fetcher.url, fetcher.fetcher, fetcher.swrConfig);
  if (!kegiatan) return <LoadingX />;

  return (
    <>
      <button>Tambah Kegiatan</button>
      <KegiatanItemConfig data={kegiatan} />
    </>
  );
}

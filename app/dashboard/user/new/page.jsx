'use client';

import NewTeman from '@teko/components/config/teman/new';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';

const userFetcer = new Fetcher('user');

export default function KegiatanPage() {
  const { data: user } = useSWR(userFetcer.url, userFetcer.fetcher);

  if (!user) return <LoadingX />;

  return (
    <>
      <NewTeman id={user.sub} role={true} />
    </>
  );
}

'use client';

import NewTeman from '@teko/components/config/newTeman';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';

const userFetcer = new Fetcher('user');

export default function KegiatanPage() {
  const { data: user } = useSWR(userFetcer.url, userFetcer.fetcher);

  return (
    <NewTeman id={user.sub} />
  );
}

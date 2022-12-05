'use client';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';

export default function Info() {
  const userFetcer = new Fetcher('user');
  const { data } = useSWR(userFetcer.url, userFetcer.fetcher, userFetcer.swrConfig);
  if (!data) {
    return (
      <>
        <h3 className="text-sm font-bold text-brand"> Belum Login </h3>
        <h3 className="text-sm text-brand"> Silahkan Login </h3>
      </>
    );
  }
  return (
    <>
      <h3 className="text-sm font-bold text-brand"> {data.email} </h3>
      <h3 className="text-sm text-brand"> {data.name} </h3>
    </>
  );
}

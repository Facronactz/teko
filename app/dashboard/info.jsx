'use client';

import LoadingX from '@teko/components/loading';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';

export default function Info() {
  const userFetcer = new Fetcher('user');
  const { data } = useSWR(
    userFetcer.url,
    userFetcer.fetcher,
    userFetcer.swrConfig,
  );
  if (!data) {
    return (
      <div className="m-auto md:flex md:flex-row">
        <LoadingX type="ball-elastic" />
      </div>
    );
  }
  return (
    <div className="m-auto md:flex md:flex-row">
      <h3 className="text-lg font-bold text-brand">
        {data.name} <span className="font-light">| {data.email} </span>
      </h3>
    </div>
  );
}

'use client';

import LoadingX from '@teko/components/loading';
import Image from 'next/image';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import spanduk from '@teko/public/image/hut-ri-ke-77.png';

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
    <>
      <div className="m-auto ">
        <h3 className=" flex flex-col md:flex md:flex-row justify-center text-base md:text-lg font-bold text-brand">
          {data.name} <span className="font-light">| {data.email} </span>
        </h3>
      </div>

      <img
        className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] object-cover object-center rounded-full m-3"
        src={data.picture || spanduk}
        width={45}
        height={45}
        alt="foto profil"
      />
    </>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Container, Alert } from 'react-bootstrap';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';

function KegiatanDetail({ id }) {
  const kegiatanDetailFetcher = new Fetcher({
    id,
    url: 'kegiatan',
  });
  const { data, error } = useSWR(
    kegiatanDetailFetcher.url,
    kegiatanDetailFetcher.fetcher,
    kegiatanDetailFetcher.swrConfig,
  );
  if (error) {
    return (
      <Alert key="danger" variant="danger">
        {' '}
        Error fetching data{' '}
      </Alert>
    );
  }
  if (!data) {
    return (
      <div className="w-screen h-[70vh] flex align-middle self-center justify-center justify-items-center justify-content-center">
        <div className="m-auto">
          <LoadingX type="ball-clip"></LoadingX>
        </div>
      </div>
    );
  }
  return (
    <>
      <Container className="bg-red flex flex-col lg:flex-row justify-center">
        <Image
          width={854}
          height={480}
          className="aspect-video mb-3"
          src={data.banner}
          alt="gambar hero"
        />
      </Container>
      <Container>
        <h3 className="lg:text-5xl">{data.nama}</h3>
        <h5 className="font-light text-sm lg:text-base">{data.lembaga.nama}</h5>
        <p className="text-justify lg:text-lg">{data.deskripsi}</p>
      </Container>

      <h3 className="flex justify-center">Dibuat Oleh:</h3>
      <div className="flex justify-center">
        <Link
          href={{
            pathname: `/teman/${data.lembaga.id}`,
          }}
          className="flex flex-col md:flex-row no-underline justify-center border border-brand bg-white shadow w-fit p-3 rounded my-auto text-brand"
        >
          <Image
            width={200}
            height={200}
            className="mr-3 rounded object-cover object-center"
            src={data.lembaga.logo}
            alt="logo"
          />
          {/* ingin membuat text nya dibawah tetapi belum nemu */}
          <h3 className="">{data.lembaga.nama}</h3>
        </Link>
      </div>
    </>
  );
}

export default function DetailKegiatanPage({ params }) {
  return (
    <>
      <TekoNavbar current="Kegiatan"></TekoNavbar>
      <h3 className="text-center mb-3 font-bold">Detail Kegiatan</h3>
      <Container className="mb-[10vh]">
        <KegiatanDetail id={params.id} />
      </Container>
      <TekoFooter />
    </>
  );
}

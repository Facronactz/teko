'use client';

import Link from 'next/link';

import { Container, Alert } from 'react-bootstrap';

import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
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
        <img
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

      <h3 className="flex justify-center">Kontak</h3>
      <Container className="flex flex-row justify-center">
        <Link href={'#'} className="w-[50%] bg-brand border-brand mx-1 rounded">
          <RiWhatsappFill className="text-white my-3 w-12 h-12 m-auto" />
        </Link>
        <Link
          href={'#'}
          className=" bg-brand w-[50%] border-brand mx-1 rounded"
        >
          <MdEmail className="text-white my-3 w-12 h-12 m-auto" />
        </Link>
      </Container>
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

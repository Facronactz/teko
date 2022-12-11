'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// eslint-disable-next-line object-curly-newline
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';

import TekoImage from '@teko/components/image';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';

import nodata from '@teko/public/image/no-data.png';

const kegiatansFetcher = new Fetcher({ url: 'kegiatan' });
function ListKegiatans({ data }) {
  if (!data) {
    return (
      <div className="flex justify-center items-center my-4">
        <LoadingX className="self-center" />
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <TekoImage
          width={288}
          height={162}
          src={nodata}
          alt="404 - Tidak Ditemukan"
        />
        <p className="text-center text-base md:text-2xl font-bold">
          Kegiatan tidak ditemukan
        </p>
      </div>
    );
  }
  return (
    <Container className="grid p-0">
      <Row className=" grid m-4 gap-3 s:grid-cols-1 lg:grid-cols-2 lg:gap-5">
        {data.map((kegiatan) => (
          <Link
            key={kegiatan.id}
            href={{
              pathname: `/kegiatan/${kegiatan.id}`,
            }}
            className="border-brand no-underline text-black hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <Col className="p-0">
              <Card className='hover:text-white hover:bg-brand'>
                <TekoImage
                  variant="top"
                  width={854}
                  height={480}
                  src={kegiatan.banner}
                  alt={`banner ${kegiatan.nama}`}
                  className="aspect-video object-cover object-center pointer-events-none"
                />
                <Card.Body className="h-fit">
                  <Card.Title className="block text-ellipsis break-words overflow-hidden max-h-[25px]">
                    {kegiatan.nama}
                  </Card.Title>
                  <p className="block text-ellipsis break-words overflow-hidden m-0 h-[100px] ">
                    {kegiatan.ringkasan}
                  </p>
                </Card.Body>
                <Card.Footer>
                  {new Date(kegiatan.tanggal).toLocaleString()}
                </Card.Footer>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </Container>
  );
}

export default function KegiatanPage() {
  const [url, setUrl] = useState(kegiatansFetcher.url);
  const { data, error } = useSWR(
    url,
    kegiatansFetcher.fetcher,
    kegiatansFetcher.swrConfig,
  );

  const [kegiatans, setKegiatans] = useState(data);
  const [query, setQuery] = useState('');

  // const cariKegiatans = (e) => {
  //   e.preventDefault();
  //   const q = query.trim();
  //   setQuery(q);
  // };

  useEffect(() => {
    if (query) {
      setUrl(`${kegiatansFetcher.url}?search=${query}`);
    } else {
      setUrl(kegiatansFetcher.url);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      setKegiatans(data);
    } else {
      setKegiatans(null);
    }
  }, [url, data]);

  if (error) return <div>failed to load</div>;
  return (
    <>
      <TekoNavbar current="Kegiatan"></TekoNavbar>
      <main className="mx-5 mt-3">
        <form className="flex flex-col md:flex-row">
          <Form.Control
            placeholder="Cari Kegiatan"
            aria-label="Cari Kegiatan"
            aria-describedby="basic-addon2"
            className="w-full mr-4 mb-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            id="button-addon2"
            className="px-4 py-2 mb-2 md:mr-4 text-lg bg-brand border-brand"
          >
            Cari
          </Button>
          <Button
            type="reset"
            id="button-addon2"
            className="px-4 py-2 mb-2 text-lg bg-brand border-brand"
            onClick={() => setQuery('')}
          >
            Reset
          </Button>
        </form>
      </main>

      <h3 className="text-center text-3xl my-3 font-bold">Kegiatan</h3>
      <ListKegiatans data={kegiatans} />

      <TekoFooter></TekoFooter>
    </>
  );
}

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
  InputGroup,
  Button,
} from 'react-bootstrap';

import Image from 'next/image';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';

const kegiatansFetcher = new Fetcher({ url: 'kegiatan' });
function ListKegiatans({ data }) {
  if (!data) {
    return (
      // TODO style loading biar center
      <div className="flex justify-center items-center">
        <LoadingX className="self-center" />
      </div>
    );
  }
  return data.map((kegiatan) => (
    <Link
      key={kegiatan.id}
      href={{
        pathname: `/kegiatan/${kegiatan.id}`,
      }}
      className="border-brand no-underline text-black"
    >
      <Col className="p-0">
        <Card>
          <Image
            variant="top"
            width={854}
            height={480}
            src={kegiatan.banner}
            alt={`banner ${kegiatan.nama}`}
            className="aspect-video object-cover object-center pointer-events-none"
          />
          <Card.Body className="h-[235px]">
            <Card.Title className="block text-ellipsis break-words overflow-hidden max-h-fit">
              {kegiatan.nama}
            </Card.Title>
            <p className="block text-ellipsis break-words overflow-hidden max-h-[100px] mb-5">
              {kegiatan.ringkasan}
            </p>
          </Card.Body>
          {kegiatan.Kategorio && <Card.Footer>
            {kegiatan.Kategori.map((item) => `#${item.nama} `)}
          </Card.Footer>}
        </Card>
      </Col>
    </Link>
  ));
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
      <div className="mx-5">
        <InputGroup className="">
          <Form.Control
            placeholder="Cari Kegiatan"
            aria-label="Cari Kegiatan"
            aria-describedby="basic-addon2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            id="button-addon2"
            className="px-4 py-2 bg-brand border-brand"
          >
            Cari
          </Button>
        </InputGroup>
      </div>

      <h3 className="text-center text-3xl my-3 font-bold">Kegiatan</h3>
      <Container className="grid p-0">
        <Row className=" grid m-4 gap-3 s:grid-cols-1 lg:grid-cols-2 lg:gap-5">
          <ListKegiatans data={kegiatans} />
        </Row>
      </Container>

      <TekoFooter></TekoFooter>
    </>
  );
}

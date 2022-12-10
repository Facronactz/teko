'use client';

import Link from 'next/link';

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

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

const kegiatansFetcher = new Fetcher({ url: 'kegiatan' });
function Kegiatans() {
  const { data, error } = useSWR(
    kegiatansFetcher.url,
    kegiatansFetcher.fetcher,
    kegiatansFetcher.swrConfig,
  );
  if (error) return <div>failed to load</div>;
  if (!data) {
    return [...Array(2)].map((i) => (
      <Col key={i} className="p-0">
        <Card>
          <Card.Header>
            <Skeleton />
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Skeleton />
            </Card.Title>
            <Card.Text>
              <Skeleton />
            </Card.Text>
            <Link href={'#'} className="rounded">
              <Skeleton width={60} height={30} />
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ));
  }
  return data.map((kegiatan) => (
    <Col key={kegiatan.id} className="p-0">
      <Card>
        <Card.Img
          variant="top"
          src={kegiatan.banner}
          alt={`banner ${kegiatan.nama}`}
          className="aspect-video object-cover object-center pointer-events-none"
        />
        <Card.Header>
          {kegiatan.Kategori.map((item) => `#${item.nama} `)}
        </Card.Header>
        <Card.Body className="h-[235px]">
          <Card.Title className="block text-ellipsis break-words overflow-hidden max-h-fit">
            {kegiatan.nama}
          </Card.Title>
          <p className="block text-ellipsis break-words overflow-hidden max-h-[100px] mb-5">
            {kegiatan.ringkasan}
          </p>
          <Link
            href={{
              pathname: `/kegiatan/${kegiatan.id}`,
            }}
            className="bg-brand border-brand no-underline absolute bottom-3 px-3 py-2 mt-5 text-white rounded"
          >
            Lihat Selengkapnya
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
}

export default function KegiatanPage() {
  return (
    <>
      <TekoNavbar current="Kegiatan"></TekoNavbar>
      <div className="mx-5">
        <InputGroup className="">
          <Form.Control
            placeholder="Cari Teman"
            aria-label="Cari Teman"
            aria-describedby="basic-addon2"
          />
          <Button
            id="button-addon2"
            className="px-4 py-2 bg-brand border-brand"
          >
            Cari
          </Button>
        </InputGroup>
      </div>

      <h3 className="text-center text-3xl my-3 font-bold">Kategori</h3>
      <Container className="grid p-0">
        <Row className=" grid m-4 gap-3 s:grid-cols-1 lg:grid-cols-2 lg:gap-5">
          <Kegiatans />
        </Row>
      </Container>

      <TekoFooter></TekoFooter>
    </>
  );
}

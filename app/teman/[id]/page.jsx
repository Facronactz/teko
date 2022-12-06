'use client';

// import Image from 'next/image';
import Link from 'next/link';

import { Container, Card, Alert } from 'react-bootstrap';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

function TemanDetail(params) {
  const temanIdFetcher = new Fetcher({ url: `teman?id=${params.id}` });
  const { data, error } = useSWR(
    temanIdFetcher.url,
    temanIdFetcher.fetcher,
    temanIdFetcher.swrConfig,
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
      <>
        <Container fluid className="flex flex-col text-center justify-center">
          <Container className="flex justify-center">
            <Skeleton className="w-[85%] h-[30%]" />
          </Container>
          <Container className="flex flex-col justify-center overflow-auto">
            <h1>
              {' '}
              <Skeleton />
            </h1>

            <h2>
              <Skeleton />
            </h2>

            <p>
              <h1>
                {' '}
                <Skeleton />
              </h1>
            </p>
          </Container>
        </Container>

        <Container className="text-center flex flex-col">
          <h3 className="w-full text-white py-2 rounded">
            {' '}
            <Skeleton />
          </h3>

          <Card>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                <Skeleton />
              </Card.Text>
              <Link href={'#'} className="rounded">
                <Skeleton width={60} height={30} />
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">
              {' '}
              <Skeleton />
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container fluid className="flex flex-col text-center justify-center">
        <Container className="flex justify-center">
          <img
            className="w-full h-[150px] mb-3 rounded md:h-[200px] md:w-[200px] object-cover object-center"
            src={data.logo}
            alt="gambar hero"
          />
        </Container>
        <Container className="flex flex-col justify-center overflow-auto">
          <h1>{data.nama}</h1>
          <h2 className="text-second">
            {data.Kategori.map((item) => `#${item.nama} `)}
          </h2>

          <p className="overflow-clip">
            <h1>{data.deskripsi}</h1>
          </p>
        </Container>
      </Container>

      <Container className="text-center flex flex-col">
        <h3 className="bg-brand w-full text-white py-2 rounded">Kegiatan</h3>
        {data.Kegiatan.map((item) => (
          <Card key={item.id} className="text-center">
            <Card.Body>
              <Card.Title>{item.nama}</Card.Title>
              <Card.Text className="overflow-hidden">
                {item.ringkasan}
              </Card.Text>
              <Link
                href={{
                  pathname: `/kegiatan/${item.id}`,
                }}
                className="bg-brand border-brand no-underline px-3 py-2 text-white rounded"
              >
                Selengkapnya
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">{item.updatedAt}</Card.Footer>
          </Card>
        ))}
      </Container>
    </>
  );
}

function TemanPage({ params }) {
  return (
    <>
      <TekoNavbar current="Teman"></TekoNavbar>
      <TemanDetail id={params.id} />
      <TekoFooter></TekoFooter>
    </>
  );
}

export default TemanPage;

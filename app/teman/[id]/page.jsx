'use client';

// import Image from 'next/image';
import Link from 'next/link';

import { Container, Card, Alert } from 'react-bootstrap';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
} from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { GrFormNextLink } from 'react-icons/gr';

function Platform({ platform }) {
  platform = platform.toLowerCase();
  if (platform === 'facebook') {
    return <AiFillFacebook className="h-[30px] w-[70px] text-brand" />;
  }
  if (platform === 'twitter') {
    return <AiFillTwitterCircle className="h-[30px] w-[70px] text-brand" />;
  }
  if (platform === 'instagram') {
    return <AiFillInstagram className="h-[30px] w-[70px] text-brand" />;
  }
  return <BsGlobe className="h-[20px] w-[20px] text-brand" />;
}

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
      <Container className="flex flex-col text-center">
        <h3 className="bg-brand w-full center text-white py-2 rounded">
          Kegiatan
        </h3>
      </Container>
      <Container className="text-center flex flex-col mt-2 mb-4 md:grid md:grid-cols-2 md:gap-4">
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
      <Container className="flex flex-col text-center">
        <h3 className="bg-brand w-full center text-white py-2 rounded">
          Media Sosial
        </h3>
      </Container>
      <Container className="grid gap-3 md:grid-cols-3 mb-4">
        {data.SosialMedia.map((sosmed) => (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Container className="grid grid-cols-2 justify-between p-0">
                <Container className="flex flex-row">
                  <Card.Title className="m-auto">
                    <Platform platform={sosmed.platform} />
                  </Card.Title>
                  <Card.Title className="m-auto">{sosmed.nama}</Card.Title>
                </Container>
                <Link
                  href={sosmed.url}
                  className="bg-white border border-brand rounded text-white m-auto p-2"
                >
                  <GrFormNextLink className="h-[30px] w-[30px]" />
                </Link>
              </Container>
            </Card.Body>
          </Card>
        ))}
      </Container>
      {/* fb,ig,twt,web, email*/}
    </>
  );
}

export default function TemanPage({ params }) {
  return (
    <>
      <TekoNavbar current="Teman"></TekoNavbar>
      <TemanDetail id={params.id} />
      <TekoFooter></TekoFooter>
    </>
  );
}

'use client';

import Link from 'next/link';
import TekoImage from '@teko/components/image';

// eslint-disable-next-line object-curly-newline
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import LoadingX from '@teko/components/loading';
import nodata from '@teko/public/image/no-data.png';

const temansFetcher = new Fetcher({ url: 'teman' });

function ListTemans({ data }) {
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
          Teman tidak ditemukan
        </p>
      </div>
    );
  }
  return (
    <Container className="grid p-0">
      <Row className=" grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-4">
        {data.map((teman) => (
          <Link
            href={{
              pathname: `/teman/${teman.id}`,
            }}
            className="no-underline text-black hover:scale-105 transform transition duration-300 ease-in-out"
            key={teman.nama}
          >
            <Col className="p-0">
              <Card className="border-brand drop-shadow">
                <TekoImage
                  variant="top"
                  src={teman.logo}
                  width="200"
                  height="200"
                  alt={`logo ${teman.nama}`}
                  className="aspect-square object-contain object-center self-center pointer-events-none"
                />
                <Card.Body className="h-[200px]">
                  <Card.Title className="block text-ellipsis break-words overflow-hidden max-h-fit">
                    {teman.nama}
                  </Card.Title>
                  <p className="block text-ellipsis break-words overflow-hidden max-h-[100px]">
                    {teman.ringkasan}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </Container>
  );
}

export default function TemanPage() {
  const [url, setUrl] = useState(temansFetcher.url);
  const { data, error } = useSWR(
    url,
    temansFetcher.fetcher,
    temansFetcher.swrConfig,
  );

  const [temans, setTemans] = useState(data);
  const [query, setQuery] = useState('');

  const cariTemans = (e) => {
    e.preventDefault();
    const q = query.trim();
    setQuery(q);
  };

  useEffect(() => {
    if (query) {
      setUrl(`${temansFetcher.url}?search=${query}`);
    } else {
      setUrl(temansFetcher.url);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      setTemans(data);
    } else {
      setTemans(null);
    }
  }, [url, data]);

  if (error) return <div>failed to load</div>;
  return (
    <>
      <TekoNavbar current="Teman"></TekoNavbar>
      <main className="mx-5 mt-3">
        <form onSubmit={cariTemans} className="flex flex-col md:flex-row">
          <Form.Control
            placeholder="Cari Teman"
            aria-label="Cari Teman"
            aria-describedby="basic-addon2"
            className="w-full mr-4 mb-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            id="button-addon2"
            className="px-4 py-2 mb-2 md:mr-4 text-lg bg-brand border-brand"
            onClick={cariTemans}
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

      <section>
        <h3 className="text-center text-3xl my-3 font-bold">Teman</h3>
        <ListTemans data={temans} />
      </section>
      <TekoFooter></TekoFooter>
    </>
  );
}

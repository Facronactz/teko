'use client';

import Link from 'next/link';

import {
  Container,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

import Skeleton from 'react-loading-skeleton';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';

const temansFetcher = new Fetcher({ url: 'teman' });
function Temans() {
  const { data, error } = useSWR(
    temansFetcher.url,
    temansFetcher.fetcher,
    temansFetcher.swrConfig,
  );
  if (error) return <div>failed to load</div>;
  if (!data) {
    return [...Array(4)].map((i) => (
      <Col key={i} className="p-0">
        <Card>
          <Skeleton className="m-3 w-[85%] h-[205px] md:h-[200px]" />
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
  return data.map((teman) => (
    <Col className="p-0" key={teman.nama}>
      <Card>
        <Card.Img
          variant="top"
          src={teman.logo}
          width="200"
          height="200"
          alt={`logo ${teman.nama}`}
          className="aspect-square object-cover object-center"
        />
        <Card.Body className="h-[225px]">
          <Card.Title>{teman.nama} </Card.Title>
          <p className="block text-ellipsis break-words overflow-hidden max-h-[100px]">
            {teman.ringkasan}
          </p>
          <Link
            href={{
              pathname: `/teman/${teman.id}`,
            }}
            className="bg-brand border-brand no-underline absolute bottom-3 px-3 py-2 text-white rounded"
          >
            Lihat
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
}

export default function TemanPage() {
  return (
    <>
      <TekoNavbar current="Teman"></TekoNavbar>
      <main className="mx-5 mt-3">
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
      </main>

      <section>
        <Container className="grid p-0">
          <Row className=" grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-4">
            <Temans />
          </Row>
        </Container>
      </section>
      <TekoFooter></TekoFooter>
    </>
  );
}

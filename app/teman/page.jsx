'use client';
import Link from 'next/link';
import { use } from 'react';

import {
  Container,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

import CustomNavbar from '@teko/components/navbar';
import CustomFooter from '@teko/components/footer';
import { assetPrefix } from '@teko/next.config';

const getTeman = async () => {
  const data = await fetch(`${assetPrefix}/api/teman`);
  return data.json();
};

export default function TemanPage() {
  const temans = use(getTeman());

  return (
    <>
      <CustomNavbar current="Teman"></CustomNavbar>
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
            {temans.map((teman) => (
              <Col className="p-0" key={teman.nama}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={teman.logo}
                    width="200"
                    height="200"
                    alt="..."
                  />
                  <Card.Body>
                    <Card.Title>{teman.nama} </Card.Title>
                    <Card.Text>{teman.ringkasan}</Card.Text>
                    <Link
                      href={{
                        pathname: `/teman/${teman.id}`,
                      }}
                      className="bg-brand border-brand no-underline px-3 py-2 text-white rounded"
                    >
                      Lihat
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <CustomFooter></CustomFooter>
    </>
  );
}

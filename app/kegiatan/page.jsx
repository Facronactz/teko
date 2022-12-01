'use client';

import Link from 'next/link';
import { use } from 'react';

import { assetPrefix } from '@teko/next.config';

import CustomNavbar from '@teko/components/navbar';
import CustomFooter from '@teko/components/footer';

// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const getKegiatan = async () => {
  const data = await fetch(`${assetPrefix}/api/kegiatan`, { cache: 'no-cache' });
  return data.json();
};

export default function KegiatanPage() {
  const kegiatans = use(getKegiatan());
  return (
    <>
      <CustomNavbar current="Kegiatan"></CustomNavbar>

      <h3 className="text-center mb-3 font-bold">Kategori</h3>

      <Container>
        {/* <Button
            onClick={this.toggleKemanusiaan()}
            type="button"
            className={
              this.state.kemanusiaan
                ? 'border-brand bg-brand text-white'
                : 'border-brand bg-white text-brand '
            }
          >
            Kemanusian
          </Button> */}
      </Container>

      <Form.Group
        className="m-2 text-xl xs:flex justify-center"
        controlId="formBasicCheckbox"
      >
        <Form.Check type="checkbox" label="Kemanusiaan" className="mx-3 py-2" />
        <Form.Check type="checkbox" label="Sosial" className="mx-3 py-2" />
        <Form.Check type="checkbox" label="Lingkungan" className="mx-3 py-2" />
      </Form.Group>
      <Container className="grid p-0">
        <Row className=" grid m-4 gap-3 s:grid-cols-1 lg:grid-cols-2 lg:gap-5">
          {kegiatans.map((data) => (
            <Col key={data.id} className="p-0">
              <Card>
                <Card.Header>
                  {data.Kategori.map((item) => `#${item.nama} `)}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{data.nama}</Card.Title>
                  <Card.Text>{data.ringkasan}</Card.Text>
                  <Link
                    href={{
                      pathname: `/kegiatan/${data.id}`,
                    }}
                    className="bg-brand border-brand no-underline px-3 py-2 text-white rounded"
                  >
                    Lihat Selengkapnya
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* <Nav
          className="hidden md:block bg-brand top-0 bottom-0 left-20 min-h-[100vh] z-0"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <h1 className="text-white text-center mt-5">Kategori</h1>
          <Nav.Item className="grid grid-cols-2 bg-white mx-10 my-3 rounded">
            <Nav.Link href="/home" className="text-brand text-lg font-semibold">
              Kemanusiaan
            </Nav.Link>
            <div className="text-brand text-lg font-semibold m-auto">
              <p className="m-0">11</p>
            </div>
          </Nav.Item>
        </Nav> */}
      <CustomFooter></CustomFooter>
    </>
  );
}

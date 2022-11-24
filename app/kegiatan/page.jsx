'use client';

import CustomNavbar from '../../components/navbar';

// import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function KegiatanPage() {
  return (
    <>
      <CustomNavbar current="Kegiatan"></CustomNavbar>

      <h3 className="text-center mb-3 font-bold">Kategori</h3>

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
          <Col className="p-0">
            <Card>
              <Card.Header>#Kemanusiaan</Card.Header>
              <Card.Body>
                <Card.Title>Judul Kegiatan</Card.Title>
                <Card.Text>Deskripsi Kegiatan</Card.Text>
                <Button
                  href="../detail-kegiatan"
                  className="bg-brand border-brand"
                >
                  Lihat Selengkapnya
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="p-0">
            <Card>
              <Card.Header>#Sosial</Card.Header>
              <Card.Body>
                <Card.Title>Judul Kegiatan</Card.Title>
                <Card.Text>Deskripsi Kegiatan</Card.Text>
                <Button
                  href="../detail-kegiatan"
                  className="bg-brand border-brand"
                >
                  Lihat Selengkapnya
                </Button>
              </Card.Body>
            </Card>
          </Col>
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
    </>
  );
}

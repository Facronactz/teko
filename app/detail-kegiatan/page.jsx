'use client';
import React from 'react';

import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';

import CustomNavbar from '../../components/navbar';
import formBg from '../../public/image/formBg.jpg';

import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

class TemanPage extends React.Component {
  render() {
    return (
      <>
        <CustomNavbar></CustomNavbar>
        <h3 className="text-center mb-3 font-bold">Detail Kegiatan</h3>
        <Container className="bg-red flex flex-col justify-center">
          <Image
            className="w-full h-[200px] lg:w-2/5 lg:h-full mb-3"
            src={formBg}
            alt="gambar hero"
          />
          <h3>Nama Kegiatan</h3>
          <h5 className="font-light text-sm">Dibuat oleh: Jaya ABadi</h5>
          <p className="text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </Container>
        <h3 className="flex justify-center">Kontak</h3>
        <Container className="flex justify-center">
          <ButtonGroup size="lg" className="mb-2">
            <Button className="bg-brand border-brand mx-1">
              {' '}
              <RiWhatsappFill className="w-full" />
            </Button>
            <Button className="bg-brand border-brand mx-1">
              <MdEmail className="w-full" />
            </Button>
          </ButtonGroup>
        </Container>

        {/* <main className="mx-5 mt-3">
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Col className="p-0" key={item}>
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/200"
                    width="200"
                    height="200"
                    alt="..."
                  />
                  <Card.Body>
                    <Card.Title>Nama </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </Card.Text>
                    <Button className="bg-brand border-brand">Lihat</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}
      </>
    );
  }
}

export default TemanPage;


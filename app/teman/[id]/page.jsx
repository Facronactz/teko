'use client';

import Image from 'next/image';

import { Container, Button, Card } from 'react-bootstrap';

import CustomNavbar from '@teko/components/navbar';
import CustomFooter from '@teko/components/footer';
// import spanduk from '@teko/public/image/hut-ri-ke-77.png';

// import { RiWhatsappFill } from 'react-icons/ri';
// import { MdEmail } from 'react-icons/md';

const getTeman = async () => {
  const data = await fetch(`${assetPrefix}/api/teman`);
  return data.json();
};

function TemanPage({ params }) {
  const temans = use(getTeman());

  return (
    <>
      <CustomNavbar current="Teman"></CustomNavbar>
      <Container fluid className="flex flex-col text-center justify-center">
        <Container className="flex justify-center">
          <Image
            className="w-full h-[150px] mb-3 rounded md:h-[200px] md:w-[200px] object-cover object-center"
            src={temans.logo}
            alt="gambar hero"
          />
        </Container>
        <Container className="flex flex-col justify-center overflow-auto">
          <h1>Nama Teman</h1>
          <h2 className="text-second">#kategori</h2>
          <p className="overflow-clip">
            Deskripsi singkat tentang organisasi, lorem ipsum dolor opmet and
            dandaskdnasndkqwbdkjqbdb wqdbkqbwdjkwbqdjbqkjbdq wbdqjw
          </p>
        </Container>
      </Container>
      <Container className="text-center flex flex-col">
        <h3 className="bg-brand w-full text-white py-2 rounded">
          Program Kerja
        </h3>
        <Card className="text-center mb-3">
          <Card.Body>
            <Card.Title>Basmi Hama</Card.Title>
            <Card.Text>Kegiatan ini dilakukan untuk vblablablal</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">2017-2020</Card.Footer>
        </Card>
        <Card className="text-center mb-3">
          <Card.Body>
            <Card.Title>Kerja Bakti</Card.Title>
            <Card.Text>Kegiatan ini dilakukan untuk vblablablal</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">2017-2020</Card.Footer>
        </Card>
        <Card className="text-center mb-3">
          <Card.Body>
            <Card.Title>Lepas Spanduk</Card.Title>
            <Card.Text>Kegiatan ini dilakukan untuk vblablablal</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">2017-2020</Card.Footer>
        </Card>
      </Container>
      <Container className="text-center flex flex-col">
        <h3 className="bg-brand w-full text-white py-2 rounded">Kegiatan</h3>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text className="overflow-hidden">
              ini aadlah kegiatan yang dilakukna wknafninqwndkjqnwdonqwdjkqndjkn
              qnjqnjkmdnkqndkqnkjdnwqkssssssssadqqdqdqdq
            </Card.Text>
            <Button className="bg-brand text-white border-brand">
              Selengkapnya
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">17 September 2020</Card.Footer>
        </Card>
      </Container>
      <CustomFooter></CustomFooter>
    </>
  );
}

export default TemanPage;

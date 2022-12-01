'use client';

import Image from 'next/image';
import Link from 'next/link';

import { use } from 'react';

import { Container, Card } from 'react-bootstrap';

import CustomNavbar from '@teko/components/navbar';
import CustomFooter from '@teko/components/footer';
// import spanduk from '@teko/public/image/hut-ri-ke-77.png';
import { assetPrefix } from '@teko/next.config';

// import { RiWhatsappFill } from 'react-icons/ri';
// import { MdEmail } from 'react-icons/md';

const getTeman = async (id) => {
  const data = await fetch(`${assetPrefix}/api/teman?id=${id}`, { cache: 'no-cache' });
  return data.json();
};

function TemanPage({ params }) {
  const temans = use(getTeman(params.id));

  return (
    <>
      <CustomNavbar current="Teman"></CustomNavbar>
      <Container fluid className="flex flex-col text-center justify-center">
        <Container className="flex justify-center">
          <Image
            width={150}
            height={150}
            className="w-full h-[150px] mb-3 rounded md:h-[200px] md:w-[200px] object-cover object-center"
            src={temans.logo}
            alt="gambar hero"
          />
        </Container>
        <Container className="flex flex-col justify-center overflow-auto">
          <h1>{temans.nama}</h1>
          {temans.Kategori.map((item) => (
            <h2 key={item.id} className="text-second">{item.nama}</h2>
          ))}

          <p className="overflow-clip">
            Deskripsi singkat tentang organisasi, lorem ipsum dolor opmet and
            dandaskdnasndkqwbdkjqbdb wqdbkqbwdjkwbqdjbqkjbdq wbdqjw
          </p>
        </Container>
      </Container>

      <Container className="text-center flex flex-col">
        <h3 className="bg-brand w-full text-white py-2 rounded">Kegiatan</h3>
        {temans.Kegiatan.map((data) => (
          <Card key={data.id} className="text-center">
            <Card.Body>
              <Card.Title>{data.nama}</Card.Title>
              <Card.Text className="overflow-hidden">
                {data.ringkasan}
              </Card.Text>
              <Link
                href={{
                  pathname: `/kegiatan/${data.id}`,
                }}
                className="bg-brand border-brand no-underline px-3 py-2 text-white rounded"
              >
                Selengkapnya
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">{data.updatedAt}</Card.Footer>
          </Card>
        ))}
      </Container>
      <CustomFooter></CustomFooter>
    </>
  );
}

export default TemanPage;

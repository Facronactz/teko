'use client';

import React from 'react';

import Image from 'next/image';

import { Container, Button, ButtonGroup } from 'react-bootstrap';

import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import CustomNavbar from '@teko/components/navbar';
import spanduk from '@teko/public/image/hut-ri-ke-77.png';

class KegiatanPage extends React.Component {
  render() {
    return (
      <>
        <CustomNavbar current="Kegiatan"></CustomNavbar>
        <h3 className="text-center mb-3 font-bold">Detail Kegiatan</h3>
        <Container className="bg-red flex flex-col lg:flex-row justify-center">
          <Image
            className="w-full h-[200px] lg:h-full mb-3"
            src={spanduk}
            alt="gambar hero"
          />
        </Container>
        <Container>
          <h3 className="lg:text-5xl">Nama Kegiatan</h3>
          <h5 className="font-light text-sm lg:text-base">
            Dibuat oleh: Jaya ABadi
          </h5>
          <p className="text-justify lg:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
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
      </>
    );
  }
}

export default KegiatanPage;

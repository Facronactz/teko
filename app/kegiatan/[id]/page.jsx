'use client';

import { use } from 'react';
import { assetPrefix } from '@teko/next.config';

import Image from 'next/image';

import { Container, Button, ButtonGroup } from 'react-bootstrap';

import { RiWhatsappFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import CustomNavbar from '@teko/components/navbar';
import spanduk from '@teko/public/image/hut-ri-ke-77.png';

const getDetail = async (id) => {
  const data = await fetch(`${assetPrefix}/api/kegiatan?id=${id}`);
  return data.json();
};

export default function DetailKegiatanPage({ params }) {
  const kegiatans = use(getDetail(params.id));

  return (
    <>
      <CustomNavbar current="Kegiatan"></CustomNavbar>
      <h3 className="text-center mb-3 font-bold">Detail Kegiatan</h3>
      <Container className="bg-red flex flex-col lg:flex-row justify-center">
        <Image
          className="w-full h-[200px] lg:h-full mb-3"
          src={kegiatans.banner}
          alt="gambar hero"
        />
      </Container>
      <Container>
        <h3 className="lg:text-5xl">{kegiatans.nama}</h3>
        <h5 className="font-light text-sm lg:text-base">
          {kegiatans.lembaga.nama}
        </h5>
        <p className="text-justify lg:text-lg">{kegiatans.deskripsi}</p>
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

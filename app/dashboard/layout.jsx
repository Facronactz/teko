'use client';

import 'react-tagsinput/react-tagsinput.css';

import Link from 'next/link';
import Image from 'next/image';

// eslint-disable-next-line object-curly-newline
import { Container, Row } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import Info from './info';

export default function DashboardLayout({ children }) {
  return (
    <main>
      <Container className="bg-white shadow my-[100px]  rounded h-full clear-both pb-3">
        <Container className="bg-white flex flex-row">
          <Image
            className="w-[100px] h-[100px] object-cover object-center rounded-full m-3"
            src={spanduk}
            alt="foto profil"
          />
          <Info />
          <Link href={'/'} className="border-brand w-20 h-20 my-auto">
            <RiArrowGoBackFill className="h-full w-full text-brand" />
          </Link>
        </Container>
        <Container className="">
          <Row className="">{children}</Row>
        </Container>
      </Container>
    </main>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';

// eslint-disable-next-line object-curly-newline
import { Container, Row } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import Info from './info';
import MenuItem from './menu';

export default function AdminPage() {
  return (
    <>
      <Container className="bg-white shadow mt-[100px] rounded">
        <Container>
          <Container className="bg-white flex flex-row">
            <Image
              className="w-[100px] h-[100px] object-cover object-center rounded-full m-3"
              src={spanduk}
              alt="wokowko"
            />
            <Info />
            <Link href={'/'} className="border-brand w-20 h-20 my-auto">
              <RiArrowGoBackFill className="h-full w-full text-brand" />
            </Link>
          </Container>
        </Container>
        <Container className="grid p-0">
          <Row className="grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-3">
            <MenuItem />
          </Row>
        </Container>
      </Container>
    </>
  );
}

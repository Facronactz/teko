'use client';

import 'react-tagsinput/react-tagsinput.css';

import Link from 'next/link';
import Image from 'next/image';

// eslint-disable-next-line object-curly-newline
import { Container } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import Info from './info';

export default function DashboardLayout({ children }) {
  return (
    <main>
      <Container className="bg-white shadow mt-[100px] rounded">
        <Container>
          <Container className="bg-white flex flex-row">
            <Image
              className="w-[100px] h-[100px] object-cover object-center rounded-full m-3"
              src={spanduk}
              // FIXME ganti alt
              alt="wokowko"
            />
            <Info />
            <Link href={'/'} className="border-brand w-20 h-20 my-auto">
              <RiArrowGoBackFill className="h-full w-full text-brand" />
            </Link>
          </Container>
        </Container>
        <Container className="grid p-0">
          {children}
        </Container>
      </Container>
    </main>
  );
}

'use client';
import Image from 'next/image';

import { Container, Card } from 'react-bootstrap';

import CustomNavbar from '@teko/components/navbar';

import kita from '@teko/public/image/1.jpg';

export default function DaftarLembaga() {
  return (
    <>
      <CustomNavbar current="Tentang Kami"></CustomNavbar>

      <Container className="text-center">
        <h1 className="font-bold text-brand text-8xl">Teko</h1>
        <p className="text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </Container>
      <Container className="">
        <figure className="md:flex bg-white shadow rounded-xl p-8 md:p-0">
          <Image
            className="object-cover object-center w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
            src={kita}
            alt=""
            width="384"
            height="512"
          />
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
              <p className="text-lg font-medium">
                “Tailwind CSS is the only framework that I've seen scale on
                large teams. It’s easy to customize, adapts to any design, and
                the build size is tiny.”
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-brand">Samuel Dayan</div>
              <div className="text-brand">Staff Engineer, Teko</div>
            </figcaption>
          </div>
        </figure>
      </Container>
    </>
  );
}


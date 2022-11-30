'use client';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import { Container } from 'react-bootstrap';

import { assetPrefix } from '@teko/next.config';
import CustomNavbar from '@teko/components/navbar';

import { AiFillMail, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const getData = async (q) => {
  const res = await fetch(`${assetPrefix}/api/data?q=${q}`);
  const data = await res.json();
  return data;
};

export default function DaftarLembaga() {
  const team = use(getData('team'));
  return (
    <>
      <CustomNavbar current="Tentang Kami"></CustomNavbar>

      <Container className="my-20 text-center lg:flex lg:flex-row">
        <h1 className="font-bold text-brand text-8xl lg:mr-10 lg:my-auto">
          Teko
        </h1>
        <p className="text-xl lg:text-left">
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

      <h2 className="text-center mb-5 text-brand font-bold lg:mb-20">
        Tim Kami
      </h2>
      <Container className="lg:grid lg:grid-cols-2 lg:gap-3 mb-5">
        {team.map((member) => (
          <figure
            key={member.name}
            className="md:flex bg-white shadow rounded-xl p-8 md:p-0"
          >
            <Image
              className="object-cover object-center w-24 h-24 md:w-48 md:h-auto md:rounded-xl rounded-full mx-auto"
              src={member.foto}
              alt=""
              width="384"
              height="512"
            />
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <p className="text-lg lg:text-xl font-medium">{member.quote}</p>
              </blockquote>
              <figcaption className="font-medium">
                <div className="text-brand text-2xl">{member.name}</div>
              </figcaption>
              <div className="flex flex-row justify-center">
                <Link
                  href={member.email}
                  className="border p-2 rounded-xl border-brand mx-2"
                >
                  <AiFillMail className="h-10 w-10 text-brand" />
                </Link>
                <Link
                  href={member.github}
                  className="border p-2 rounded-xl border-brand mx-2"
                >
                  <AiFillGithub className="h-10 w-10 text-brand" />
                </Link>
                <Link
                  href={member.linkedin}
                  className="border p-2 rounded-xl border-brand mx-2"
                >
                  <AiFillLinkedin className="h-10 w-10 text-brand" />
                </Link>
              </div>
            </div>
          </figure>
        ))}
      </Container>
    </>
  );
}


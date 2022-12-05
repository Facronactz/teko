'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import { Container } from 'react-bootstrap';

import { assetPrefix } from '@teko/next.config';
import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

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
      <TekoNavbar current="Tentang Kami"></TekoNavbar>

      <Container className="my-20 text-center lg:flex lg:flex-row">
        <h1 className="font-bold text-brand text-8xl lg:mr-10 lg:my-auto">
          Teko
        </h1>
        <p className="text-xl lg:text-left">
          Platform yang dapat memberikan dukungan bagi suatu komunitas untuk masyarakat, khususnya dalam penggalangan dana dan pengenalan Kegiatan dari komunitas.
          Teko ini Dibangun menggunakan Next.js sebagai framework, Saat ini banyak sekali komunitas yang terdaftar dan menggunakan platform ini sebagai prasarana pengumpulan dana untuk kegiatan pengabdian mereka.
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
                  href={`mailto:${member.email}`}
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
      <TekoFooter></TekoFooter>
    </>
  );
}

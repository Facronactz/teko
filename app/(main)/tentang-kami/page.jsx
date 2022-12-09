'use client';

import Link from 'next/link';

import { Container, Alert } from 'react-bootstrap';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import { AiFillMail, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const teamFetcher = new Fetcher({ url: 'data?q=team' });
function Team() {
  const { data, error } = useSWR(
    teamFetcher.url,
    teamFetcher.fetcher,
    teamFetcher.swrConfig,
  );
  if (error) {
    return (
      <Alert key="danger" variant="danger">
        {' '}
        Error fetching data{' '}
      </Alert>
    );
  }
  if (!data) {
    return [1, 2, 3, 4].map(() => (
      <Skeleton className="flex flex-row justify-center" count={2} />
    ));
  }
  return data.map((member) => (
    <figure
      key={member.name}
      className="md:flex bg-white shadow rounded-xl p-8 md:p-0"
    >
      <img
        className="object-cover aspect-[3/4] object-center w-full h-full md:w-48 md:h-auto md:rounded-xl rounded-full mx-auto"
        src={member.foto}
        alt={`foto ${member.name}`}
      />
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        <p className="text-lg lg:text-xl font-light">
          <q>{member.quote}</q>
        </p>
        <figcaption className="font-bold">
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
  ));
}

export default function TentangKami() {
  return (
    <>
      <TekoNavbar current="Tentang Kami"></TekoNavbar>

      <Container className="my-20 text-center lg:flex lg:flex-row">
        <h1 className="font-bold text-brand text-8xl lg:mr-10 lg:my-auto">
          Teko
        </h1>
        <p className="text-xl lg:text-left">
          Platform yang memberikan informasi mengenai organisasi yang bergerak
          di Indonesia untuk diketahui masyarakat luas. Teko diharapkan dapat
          membantu masyarakat dalam mencari informasi mengenai organisasi
        </p>
      </Container>

      <h2 className="text-center mb-5 text-brand font-bold lg:mb-20">
        Tim Kami
      </h2>
      <Container className="lg:grid lg:grid-cols-2 lg:gap-3 mb-5">
        <Team />
      </Container>
      <TekoFooter></TekoFooter>
    </>
  );
}

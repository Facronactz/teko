'use client';

import Link from 'next/link';

import { Container, Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import { useState } from 'react';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';
import FormSetting from './setting';
import FormPassword from './password';
import UploadImage from './upload';

export default function SettingUser() {
  const userFetcer = new Fetcher('user');
  const [show, setShow] = useState(false);

  const { data: user } = useSWR(userFetcer.url, userFetcer.fetcher);

  const showHandler = () => {
    setShow(!show);
  };

  if (!user) return <LoadingX />;

  return (
    <>
      {/* TODO style button dibawah ini */}
      <div className="flex gap-3 justify-center">
        <Link
          href={'/dashboard/user/new'}
          className="block w-auto no-underline p-4 bg-brand text-white text-center font-semibold mb-10 rounded mt-3"
        >
          Buat {'“Teman”'}
        </Link>
      </div>
      <div className="container">
        <FormSetting user={user}>
          <UploadImage type='user' />
        </FormSetting>
      </div>
      <Container className="flex flex-col">
        <Button onClick={() => showHandler()} className="bg-white border-brand text-brand">
          Ubah Password
        </Button>
        {show && <FormPassword id={user.sub} />}
      </Container>
    </>
  );
}

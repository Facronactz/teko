'use client';

import { Container, Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import { useState } from 'react';
import useSWR from 'swr';
import LoadingX from '@teko/components/loading';
import FormSetting from './setting/formSetting';
import FormPassword from './setting/formPassword';
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
      <div className="flex gap-3 justify-center">
      </div>
      <div className="container">
        <FormSetting id={user.sub}>
          <UploadImage type="user" />
        </FormSetting>
      </div>
      <Container className="flex flex-col">
        <Button
          onClick={() => showHandler()}
          className="bg-white border-brand text-brand"
        >
          Ubah Password
        </Button>
        {show && <FormPassword id={user.sub} />}
      </Container>
    </>
  );
}

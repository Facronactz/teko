'use client';

import Link from 'next/link';

import { Container, Button } from 'react-bootstrap';

import { useState } from 'react';
import FormSetting from './setting';
import UploadImage from './upload';

// TODO @vang rona, belum memiliki fungsi & logika sama sekali
// FIXME buat yang password bingung klo pake state nanti di react component in

function FormPassword() {
  return (
    <form action="" id="change-pass" className="flex flex-col">
      <label className="my-3 font-semibold">Password Lama:</label>
      <input
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <label className="my-3 font-semibold">Password Baru:</label>
      <input
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <label className="my-3 font-semibold">
        Konfirmasi Password Baru:
      </label>
      <input
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <Button
        type="submit"
        className="my-3 font-semibold text-lg bg-brand border-brand py-3"
      >
        Ubah Password
      </Button>
    </form>
  );
}

export default function SettingUser() {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(!show);
  };

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
        <FormSetting>
          <UploadImage type='user' />
        </FormSetting>
      </div>
      <Container className="flex flex-col">
        <Button onClick={() => showHandler()} className="bg-white border-brand text-brand">
          Ubah Password
        </Button>
        {show && <FormPassword />}
      </Container>
    </>
  );
}

'use client';

import Fetcher from '@teko/helpers/fetcher';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';

export default function FormPassword({ id }) {
  const userFetcer = new Fetcher('users');
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  // TODO swal

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      alert('Password baru tidak sama');
      return;
    }
    const data = {
      id,
      password: passwordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };
    const res = await userFetcer.put(data);
    if (res.status === 201) {
      alert('Password berhasil diubah');
    } else {
      alert('Password gagal diubah');
    }
  };

  return (
    <form action="" id="change-pass" className="flex flex-col" onSubmit={submitHandler}>
      <label className="my-3 font-semibold">Password Lama:</label>
      <input
        ref={passwordRef}
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <label className="my-3 font-semibold">Password Baru:</label>
      <input
        ref={newPasswordRef}
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <label className="my-3 font-semibold">
        Konfirmasi Password Baru:
      </label>
      <input
        ref={confirmNewPasswordRef}
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

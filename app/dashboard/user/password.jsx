'use client';

import Fetcher from '@teko/helpers/fetcher';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function FormPassword({ id }) {
  const userFetcer = new Fetcher('users');
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      id,
      password: passwordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };
    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      Swal.fire({
        icon: 'error',
        text: 'Password baru tidak sama',
        confirmButtonColor: '#315343',
      });
    } else {
      const res = await userFetcer.put(data);
      if (res.status === 201) {
        Swal.fire({
          icon: 'error',
          title: 'Okee...',
          text: 'Password gagal diubah',
          confirmButtonColor: '#315343',
        });
      } else {
        const ok = Swal.fire({
          icon: 'success',
          title: 'Okee...',
          text: 'Password berhasil diubah',
          confirmButtonColor: '#315343',
        });
        if (ok.isConfirmed) {
          router.refresh();
        }
      }
    }
  };

  return (
    <form
      action=""
      id="change-pass"
      className="flex flex-col"
      onSubmit={submitHandler}
    >
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
      <label className="my-3 font-semibold">Konfirmasi Password Baru:</label>
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

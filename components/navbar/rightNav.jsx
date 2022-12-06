'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import LoadingX from '@teko/components/loading';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Swal from 'sweetalert2';
import DaftarModal from './daftarModals';
import MasukModal from './masukModals';

export default function RightNav() {
  // eslint-disable-next-line no-unused-vars
  const { data: session, status } = useSession();
  const userFetcer = new Fetcher('user');
  const { data } = useSWR(
    status === 'authenticated' ? userFetcer.url : null,
    userFetcer.fetcher,
    userFetcer.swrConfig,
  );

  async function logAlert(e) {
    e.preventDefault();
    const swal = await Swal.fire({
      title: 'Anda yakin untuk keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Keluar!',
    });
    if (swal.isConfirmed) {
      signOut();
    }
  }

  if (status === 'loading') {
    return <LoadingX type="ball-elastic"></LoadingX>;
  }
  if (status === 'authenticated') {
    if (data && data.role === 'USER') {
      return (
        <>
          <Link
            href="/dashboard"
            className="mx-2 my-auto font-bold no-underline text-brand lg:text-lg"
          >
            Setting
          </Link>
          <Button
            onClick={logAlert}
            className="bg-white border-brand mx-2 font-bold no-underline text-brand lg:text-lg"
          >
            Keluar
          </Button>
        </>
      );
    }
    return (
      <>
        <Link
          href="/dashboard"
          className="mx-2 my-auto font-bold no-underline text-brand lg:text-lg"
        >
          Dashboard
        </Link>
        <Button
          onClick={logAlert}
          className="bg-white border-brand mx-2 font-bold no-underline text-brand lg:text-lg"
        >
          Keluar
        </Button>
      </>
    );
  }
  return (
    <>
      <DaftarModal></DaftarModal>
      <MasukModal></MasukModal>
    </>
  );
}

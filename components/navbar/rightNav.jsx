'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import LoadingX from '@teko/components/loading';
import DaftarModal from './daftarModals';
import MasukModal from './masukModals';

export default function RightNav() {
  // eslint-disable-next-line no-unused-vars
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <LoadingX type='ball-elastic'></LoadingX>;
  }
  if (status === 'authenticated') {
    return (
      <>
        <Link
          href="/dashboard"
          className="mx-2 font-bold no-underline text-brand lg:text-lg"
        >
          Dashboard
        </Link>
        {/* TODO tambahkan alert untuk signout */}
        <Link
          href="#"
          onClick={signOut}
          className="mx-2 font-bold no-underline text-brand lg:text-lg"
        >
          Keluar
        </Link>
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

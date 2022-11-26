'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import DaftarModal from './daftarModals';
import MasukModal from './masukModals';

export default function LeftNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Link href="/dashboard" className="mx-2 font-bold no-underline text-brand lg:text-lg">
          Dashboard
        </Link>
        <Link href="/api/auth/signout" className="mx-2 font-bold no-underline text-brand lg:text-lg">
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

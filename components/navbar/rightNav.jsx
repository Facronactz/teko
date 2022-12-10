'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Link from 'next/link';
import LoadingX from '@teko/components/loading';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Swal from 'sweetalert2';
import TekoImage from '@teko/components/image';
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

  if (status === 'unauthenticated') {
    return (
      <>
        <DaftarModal></DaftarModal>
        <MasukModal></MasukModal>
      </>
    );
  }
  if (status === 'authenticated' && data) {
    return (
      <OverlayTrigger trigger="click" placement="bottom"
        overlay={
          <Popover id="popover-basic">
            <Popover.Body>
              <div className='flex flex-col gap-3'>
                <Link
                  href={`/dashboard/${data.role.toLowerCase()}`}
                  className="mx-2 my-auto font-bold no-underline bg-white p-2 rounded text-brand border-[1.5px] border-brand lg:text-lg"
                >
                  {data.role === 'USER' ? 'Setting' : 'Dashboard'}
                </Link>
                <Button
                  onClick={logAlert}
                  className="bg-brand border-brand mx-2 font-bold no-underline text-white lg:text-lg"
                >
                  Keluar
                </Button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >

        {/* TODO style */}
        <div className='flex mx-auto cursor-pointer outline-1 outline-brand border-brand hover:text-white hover:bg-brand p-1 rounded'>
          <div className='self-center'>
            {data.name ?? data.username}<br />
            {data.email}
          </div>
          <TekoImage
            className="w-[45px] h-[45px] md:w-[45px] md:h-[45px] object-cover object-center rounded-full mx-3 pointer-events-none"
            src={data.picture}
            width={45}
            height={45}
            alt="foto profil"
          />
        </div>
      </OverlayTrigger>
    );
  }
  return <LoadingX type="ball-elastic"></LoadingX>;
}

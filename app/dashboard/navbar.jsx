'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TbRefresh } from 'react-icons/tb';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import Info from './info';

export default function DashboardNavbar() {
  const router = useRouter();
  return (
    <div className="bg-white flex flex-row container">
      <button type='button' onClick={() => router.back()} className="border-brand w-20 h-20 my-auto">
        <IoMdArrowRoundBack className="h-full w-full text-brand ml-2" />
      </button>
      <button type='button' onClick={() => router.refresh()} className="border-brand w-20 h-20 my-auto">
        <TbRefresh className="h-full w-full text-brand ml-3" />
      </button>
      <Info />
      <Image
        className="w-[100px] h-[100px] object-cover object-center rounded-full m-3"
        src={spanduk}
        alt="foto profil"
      />
    </div>
  );
}

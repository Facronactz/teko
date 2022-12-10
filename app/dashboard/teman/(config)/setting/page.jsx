'use client';

import Link from 'next/link';
import FormSetting from '@teko/components/config/setting';

export default function SettingUser() {
  return (
    <>
      <div className="flex gap-3 justify-center">
        <Link
          href={'/dashboard/user/new'}
          className="block w-full mx-5 text-lg no-underline p-4 bg-brand text-white text-center font-semibold mb-10 rounded mt-3"
        >
          Buat {'“Teman”'}
        </Link>
      </div>
      <FormSetting />
    </>
  );
}

'use client';

import { assetPrefix } from '@teko/next.config';
import { use } from 'react';

import Link from 'next/link';

import { Container, Table, Button } from 'react-bootstrap';

import { GiThreeFriends } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';

const getTemans = async () => {
  const data = await fetch(`${assetPrefix}/api/teman`, { cache: 'no-cache' });
  return data.json();
};

const deleteTeman = async () => {
  const res = await fetch(`${assetPrefix}/api/teman`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data1 = await res.json();
  return data1;
};

export default function TemanConfig() {
  const temans = use(getTemans());
  return (
    <>
      <Container className="m-0 p-0 w-52 bg-brand fixed h-full overflow-auto">
        <h1 className="text-white p-4 font-bold">Teko</h1>
        <hr className="text-white mx-3" />
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Beranda
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/admin/menu-config'}
        >
          Menu
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/admin/user-config'}
        >
          Pengguna
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/admin/teman-config'}
        >
          Teman
        </Link>
      </Container>
      <Container className="ml-52 mr-10 p-4 h-full">
        <h2 className="flex flex-row">
          <GiThreeFriends className="mr-2" /> Teman Config
          {/* TODO button new teman ganti link dan arahain ke page new */}
          <Button>New Teman <GoPlus></GoPlus></Button>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {temans.map((teman) => (
              <tr key={teman.id}>
                <td className="text-center">{teman.id}</td>
                <td className="text-center">{teman.nama}</td>
                <td className="flex flex-row justify-center">
                  <Link
                    href={`/dashboard/admin/teman-config/${teman.id}`}
                    className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
                  >
                    <AiFillEdit className="h-[25px] w-[70px] text-white" />
                  </Link>
                  <Button
                    onClick={deleteTeman}
                    className="bg-white border-brand ml-3"
                  >
                    <ImCross className="h-[25px] w-[70px] text-danger" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

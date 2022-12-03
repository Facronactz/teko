'use client';

import { assetPrefix } from '@teko/next.config';
import { use } from 'react';

import Link from 'next/link';

import { Container, Table, Button } from 'react-bootstrap';

import { RiUserFill } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';

const getUsers = async () => {
  const data = await fetch(`${assetPrefix}/api/user`, { cache: 'no-cache' });
  return data.json();
};

export default function UserPage() {
  const users = use(getUsers());

  return (
    <>
      <Container className="m-0 p-0 w-52 bg-brand fixed h-full overflow-auto">
        <h1 className="text-white p-4 font-bold">Teko</h1>
        <h2 className="text-white p-4 font-bold">User Dashboard</h2>
        <hr className="text-white mx-3" />
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Beranda
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/user/teman/'}
        >
          Lembaga
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/admin/user-config'}
        >
          Ubah Profil
        </Link>
      </Container>
      <Container className="ml-52 mr-10 p-4 h-full">
        <h2 className="flex flex-row">
          <RiUserFill className="mr-2" /> User Config
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">username</th>
              <th className="text-center">email</th>
              <th className="text-center">role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.username}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.role}</td>

                <td className="flex flex-row justify-center">
                  <Button className=" bg-white border-brand ml-3">
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


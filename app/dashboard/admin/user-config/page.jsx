'use client';

import Link from 'next/link';

import { Container, Table, Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import { RiUserFill } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';

const userFetcher = new Fetcher({ url: 'users' });
function ShowUser() {
  const { data, error } = useSWR(
    userFetcher.url,
    userFetcher.fetcher,
    userFetcher.swrConfig
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>

        <td className="flex flex-row justify-center">
          <Link href={'#'} className="ml-3">
            <Skeleton width={60} height={30} />
          </Link>
        </td>
      </tr>
    );
  }
  return data.map((user) => (
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
  ));
}

export default function UserConfig() {
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
            <ShowUser />
          </tbody>
        </Table>
      </Container>
    </>
  );
}


'use client';

import Link from 'next/link';
import { assetPrefix } from '@teko/next.config';
import { useRef } from 'react';

import { Container, Table, Button } from 'react-bootstrap';

import { RiMenuFoldFill } from 'react-icons/ri';
import { GoCheck } from 'react-icons/go';
import { ImCross } from 'react-icons/im';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

const menusFetcher = new Fetcher({ url: 'menus' });
function Menus() {
  const { data, error } = useSWR(
    menusFetcher.url,
    menusFetcher.fetcher,
    menusFetcher.swrConfig
  );
  const nameRef = useRef();
  const hrefRef = useRef();

  async function onSubmit(e) {
    e.preventDefault();
    const data = {
      data: {
        name: nameRef.current.value,
        href: hrefRef.current.value,
      },
    };
    const updateData = await updateMenu(data);
    console.log(await updateData);
  }

  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        <td className="text-center">
          {' '}
          <Skeleton />
        </td>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="flex flex-row justify-center">
          <Link href={'#'} className="rounded ml-3 my-auto p-2">
            <Skeleton width={60} height={30} />
          </Link>
          <Link href={'#'} className="ml-3 rounded">
            <Skeleton width={60} height={30} />
          </Link>
        </td>
      </tr>
    );
  }
  return data.map((menu) => (
    <tr key={menu.id} onSubmit={onSubmit}>
      <td className="text-center">{menu.id}</td>
      <td className="text-center" contentEditable="true" ref={nameRef}>
        {menu.name}
      </td>
      <td className="text-center" contentEditable="true" ref={hrefRef}>
        {menu.href}
      </td>
      <td className="flex flex-row justify-center">
        <Button
          type="submit"
          className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
        >
          <GoCheck className="h-[30px] w-[70px] text-white" />
        </Button>
        <Button onClick={deleteMenu} className="bg-white border-brand ml-3">
          <ImCross className="h-[25px] w-[70px] text-danger" />
        </Button>
      </td>
    </tr>
  ));
}

const deleteMenu = async () => {
  const res = await fetch(`${assetPrefix}/api/menus?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data2 = await res.json();
  return data2;
};

const updateMenu = async (data) => {
  const res = await fetch(`${assetPrefix}/api/menus?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const data2 = await res.json();
  return data2;
};

export default function MenuConfig() {
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
      <Container className="ml-52 p-4 h-full">
        <h2 className="flex flex-row">
          <RiMenuFoldFill className="mr-2" /> Menus Config
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">href</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <Menus />
          </tbody>
        </Table>
      </Container>
    </>
  );
}

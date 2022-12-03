'use client';

import Link from 'next/link';
import { assetPrefix } from '@teko/next.config';
import { use, useRef } from 'react';
// import Image from 'next/image';

import { Container, Table, Button } from 'react-bootstrap';

import { RiMenuFoldFill } from 'react-icons/ri';
import { GoCheck } from 'react-icons/go';
import { ImCross } from 'react-icons/im';

const getMenus = async () => {
  const data = await fetch(`${assetPrefix}/api/menus`);
  return data.json();
};

// TODO fungsi detele edit menus blm di coba
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
  const menus = use(getMenus());
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
            {menus.map((menu) => (
              <tr key={menu.id} onSubmit={onSubmit}>
                <td className="text-center">{menu.id}</td>
                <td
                  className="text-center"
                  contentEditable="true"
                  ref={nameRef}
                >
                  {menu.name}
                </td>
                <td
                  className="text-center"
                  contentEditable="true"
                  ref={hrefRef}
                >
                  {menu.href}
                </td>
                <td className="flex flex-row justify-center">
                  <Button
                    type="submit"
                    className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
                  >
                    <GoCheck className="h-[30px] w-[70px] text-white" />
                  </Button>
                  <Button
                    onClick={deleteMenu}
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

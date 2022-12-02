'use client';

import { assetPrefix } from '@teko/next.config';
import { use } from 'react';

import Link from 'next/link';

import { Container, Table } from 'react-bootstrap';

import { ImCross } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai';

const getTemans = async () => {
  const data = await fetch(`${assetPrefix}/api/teman`, { cache: 'no-cache' });
  return data.json();
};

export default function TemanConfig() {
  const temans = use(getTemans());

  return (
    <>
      <Container className="m-0 p-0 w-52 bg-brand fixed h-full overflow-auto">
        <h1 className="text-white p-4 font-bold">Teko</h1>
        <hr className="text-white mx-3" />
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Kembali
        </Link>
        <Link
          className="block text-white p-4 no-underline"
          href={'/dashboard/admin/teman-config/edit-teman'}
        >
          Edit Teman
        </Link>
      </Container>
      <Container className="ml-52 mr-10 p-4 h-full">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {temans.map((teman) => (
              <tr key={teman.id}>
                <td>{teman.id}</td>
                <td>{teman.nama}</td>
                <td className="flex flex-row my-auto">
                  <Link
                    href={`/dashboard/admin/teman-config/${teman.id}`}
                    // TODO blm bisa get data berdasarkan id untuk di edit

                    className="bg-brand text-white border-brand"
                  >
                    <AiFillEdit className="h-[25px] w-[70px] text-white" />
                  </Link>
                  <Link href={'#'} className="">
                    <ImCross className="h-[25px] w-[70px] text-danger" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

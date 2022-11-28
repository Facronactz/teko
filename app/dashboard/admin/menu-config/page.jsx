'use client';

import Link from 'next/link';

import { Container, Table } from 'react-bootstrap/Container';

import { GoCheck } from 'react-icons/go';
import { ImCross } from 'react-icons/im';

export default function MenuConfig() {
  return (
    <>
      <Container className="m-0 p-0 w-52 bg-brand fixed h-full overflow-auto">
        <h1 className="text-white p-4 font-bold">Teko</h1>
        <hr className="text-white mx-3" />
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Menu
        </Link>
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Pengguna
        </Link>
        <Link className="block text-white p-4 no-underline" href={'/'}>
          Teman
        </Link>
      </Container>
      <Container className="ml-52 p-4 h-full">
        <h2>Responsive Sidebar Example</h2>
        <p>
          This example use media queries to transform the sidebar to a top
          navigation bar when the screen size is 700px or less.
        </p>
        <p>
          We have also added a media query for screens that are 400px or less,
          which will vertically stack and center the navigation links.
        </p>
        <h3>Resize the browser window to see the effect.</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>href</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td contenteditable="true">Mark</td>
              <td contenteditable="true">Otto</td>
              <td className="flex flex-row my-auto">
                <Link href={'#'} className="">
                  <GoCheck className="h-[30px] w-[70px] text-brand" />
                </Link>
                <Link href={'#'} className="">
                  <ImCross className="h-[25px] w-[70px] text-danger" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td contenteditable="true">Jacob</td>
              <td contenteditable="true">Thornton</td>
              <td className="flex flex-row my-auto">
                <Link href={'#'} className="">
                  <GoCheck className="h-[30px] w-[70px] text-brand" />
                </Link>
                <Link href={'#'} className="">
                  <ImCross className="h-[25px] w-[70px] text-danger" />
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

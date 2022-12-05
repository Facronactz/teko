'use client';

import { Container, Table } from 'react-bootstrap';
import { RiMenuFoldFill } from 'react-icons/ri';

import Fetcher from '@teko/helpers/fetcher';

import SideBar from '@teko/components/sidebar';
import New from './new';
import Menus from './menus';

const menusFetcher = new Fetcher({ url: 'menus' });

export default function MenuConfig() {
  return (
    <>
      <SideBar current='menu' />
      <Container className="ml-52 p-4 h-full">
        <h2 className="flex flex-row">
          <RiMenuFoldFill className="mr-2" /> Menus Config
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              {['id', 'name', 'href', 'action'].map((title) => (
                <th className="text-center" key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Menus fetcher={menusFetcher} />
            <New fetcher={menusFetcher} />
          </tbody>
        </Table>
      </Container>
    </>
  );
}

'use client';

import { Table } from 'react-bootstrap';
import { RiMenuFoldFill } from 'react-icons/ri';

import Fetcher from '@teko/helpers/fetcher';

import SideBar from '@teko/components/sidebar';
import New from './new';
import Menus from './menus';

const menusFetcher = new Fetcher({ url: 'menus' });

export default function MenuConfig() {
  return (
    <>
      <div className="flex row m-3 gap-3">
        <SideBar className="col" current="pengaturan menu" role="admin" />

        <section className="w-full col h-full p-0">
          <h2 className="flex flex-row">
            <RiMenuFoldFill className="mr-2" /> Menus Config
          </h2>
          <Table bordered hover className="w-full table-auto">
            <thead>
              <tr className="padding: .35em">
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
        </section>
      </div>
    </>
  );
}

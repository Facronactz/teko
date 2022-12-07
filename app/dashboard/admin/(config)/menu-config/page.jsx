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
      <div>
        <SideBar className="col" current="pengaturan menu" role="admin" />

        <div className="w-full xl:ml-52 mr-10 p-4 xl:w-[85%] h-full">
          <h2 className="flex flex-row">
            <RiMenuFoldFill className="mr-2" /> Menus Config
          </h2>
          <Table striped bordered hover className="w-full table-fixed">
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
        </div>
      </div>
    </>
  );
}

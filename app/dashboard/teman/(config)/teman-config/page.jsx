'use client';

import ListTeman from '@teko/components/config/teman/list';
import { Table } from 'react-bootstrap';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Link from 'next/link';
import { GoPlus } from 'react-icons/go';
import SideBar from '@teko/components/sidebar';
import { GiThreeFriends } from 'react-icons/gi';
import { useState, useEffect } from 'react';

export default function TemanConfig() {
  const userFetcher = new Fetcher({ url: 'user' });
  const { data: user } = useSWR(userFetcher.url, userFetcher.fetcher);
  const [id, setId] = useState(null);
  useEffect(() => {
    if (user) {
      setId(user.sub);
    }
  }, [user]);
  return (
    <div className="flex row m-3 gap-3">
      <SideBar className="col" current="teman" role="teman" />
      <section className="w-full col h-full p-0">
        <div className="flex flex-col xs:flex-row justify-between">
          <div className="flex flex-col text-4xl xs:flex-row just mb-2">
            <GiThreeFriends className="mr-2" /> Teman Config
          </div>
          <Link
            href={'/dashboard/admin/teman-config/new'}
            className="no-underline flex flex-row text-white bg-brand p-2 my-auto ml-3 mb-3 text-lg rounded"
          >
            Tambah Teman <GoPlus className="ml-2 my-auto" />
          </Link>
        </div>
        <Table bordered hover className="table-auto">
          <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <ListTeman owner={id} />
          </tbody>
        </Table>
      </section>
    </div>
  );
}

'use client';

import { assetPrefix } from '@teko/next.config';

import Link from 'next/link';

import { Container, Table, Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import SideBar from '@teko/components/sidebar';

import { GiThreeFriends } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';

const deleteTeman = async () => {
  const res = await fetch(`${assetPrefix}/api/teman`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data1 = await res.json();
  return data1;
};

const temanFetcher = new Fetcher({ url: 'teman' });
function ShowTeman() {
  const { data, error } = useSWR(
    temanFetcher.url,
    temanFetcher.fetcher,
    temanFetcher.swrConfig,
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        <td className="text-center">
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
  return data.map((teman) => (
    <tr key={teman.id}>
      <td className="text-center">{teman.id}</td>
      <td className="text-center">{teman.nama}</td>
      <td className="flex flex-row justify-center">
        <Link
          href={`/dashboard/admin/teman-config/${teman.id}`}
          className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
        >
          <AiFillEdit className="h-[25px] w-[70px] text-white" />
        </Link>
        <Button onClick={deleteTeman} className="bg-white border-brand ml-3">
          <ImCross className="h-[25px] w-[70px] text-danger" />
        </Button>
      </td>
    </tr>
  ));
}

export default function TemanConfig() {
  return (
    <>
      <SideBar current='teman' />
      <Container className="ml-52 mr-10 p-4 h-full">
        <h2 className="flex flex-row">
          <GiThreeFriends className="mr-2" /> Teman Config
          <Link
            href={'/dashboard/admin/teman-config/new'}
            className="no-underline flex flex-row text-white bg-brand p-2 my-auto ml-3 text-lg rounded"
          >
            New Teman <GoPlus></GoPlus>
          </Link>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">id</th>
              <th className="text-center">name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <ShowTeman />
          </tbody>
        </Table>
      </Container>
    </>
  );
}

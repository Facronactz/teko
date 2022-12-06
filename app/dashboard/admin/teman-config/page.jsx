'use client';

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
import Swal from 'sweetalert2';

const temanFetcher = new Fetcher({ url: 'teman' });

const deleteTeman = async (id) => {
  const swal = await Swal.fire({
    title: 'Apakah anda yakin?',
    text: 'Anda tidak akan dapat mengembalikan data ini!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  });
  if (swal.isConfirmed) {
    const resp = temanFetcher.delete(id);
    if (!resp.error) {
      Swal.fire({
        icon: 'success',
        title: 'Oke,',
        text: 'Data teman telah dihapus.',
        confirmButtonColor: '#315343',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal,',
        text: 'Data teman gagal dihapus.',
        confirmButtonColor: '#315343',
      });
    }
  }
};

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
        <td className="flex flex-row justify-center">
          <Button className="bg-brand text-white border-brand rounded ml-3 my-auto p-2">
            <AiFillEdit className="h-[25px] w-[70px] text-white" />
          </Button>
          <Button className="bg-white border-brand ml-3">
            <ImCross className="h-[25px] w-[70px] text-danger" />
          </Button>
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
        <Button
          onClick={() => deleteTeman(teman.id)}
          className="bg-white border-brand ml-3"
        >
          <ImCross className="h-[25px] w-[70px] text-danger" />
        </Button>
      </td>
    </tr>
  ));
}

export default function TemanConfig() {
  return (
    <>
      <SideBar current="teman" role="admin" />
      <Container className="ml-52 mr-10 p-4 w-[85%] h-full">
        <h2 className="flex flex-row">
          <Container className="flex flex-row justify-between">
            <div className="flex flex-row">
              <GiThreeFriends className="mr-2" /> Teman Config
            </div>
            <Link
              href={'/dashboard/admin/teman-config/new'}
              className="no-underline flex flex-row text-white bg-brand p-2 my-auto ml-3 text-lg rounded"
            >
              Tambah Teman <GoPlus className="ml-2 my-auto" />
            </Link>
          </Container>
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

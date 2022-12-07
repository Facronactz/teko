'use client';

import { Table, Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import SideBar from '@teko/components/sidebar';

import { RiUserFill } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import Swal from 'sweetalert2';

const userFetcher = new Fetcher({ url: 'users' });

const deleteUser = async (id) => {
  const swal = await Swal.fire({
    title: 'Apakah anda yakin?',
    text: 'Anda tidak akan dapat mengembalikan data ini!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#315343',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  });
  if (swal.isConfirmed) {
    const resp = await userFetcher.delete(id);
    if (!resp.error) {
      Swal.fire({
        icon: 'success',
        title: 'Yap,',
        text: 'Data user telah dihapus.',
        confirmButtonColor: '#315343',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal.',
        text: 'Data user gagal dihapus.',
        confirmButtonColor: '#315343',
      });
    }
  }
};

function ShowUser() {
  const { data, error } = useSWR(
    userFetcher.url,
    userFetcher.fetcher,
    userFetcher.swrConfig,
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        {[...Array(5)].map((_, i) => (
          <td className="text-center" key={i}>
            <Skeleton />
          </td>
        ))}
        <td className="flex flex-row justify-center">
          <Skeleton />
        </td>
      </tr>
    );
  }
  return data.map((user) => (
    <tr key={user.id}>
      <td className="text-center w-[190px]">{user.id}</td>
      <td className="text-center">{user.name}</td>
      <td className="text-center">{user.username}</td>
      <td className="text-center">{user.email}</td>
      <td className="text-center">{user.role}</td>

      <td className="flex flex-row justify-center">
        <Button
          onClick={() => deleteUser(user.id)}
          className=" bg-white border-brand ml-3"
        >
          <ImCross className="h-[25px] w-[70px] text-danger" />
        </Button>
      </td>
    </tr>
  ));
}

export default function UserConfig() {
  return (
    <>
      <div className="flex row m-3 gap-3">
        <SideBar className="col" current="pengguna" role="admin" />
        <section className="w-full col h-full p-0">
          <h2 className="flex flex-row">
            <RiUserFill className="mr-2" /> User Config
          </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                {['id', 'nama', 'username', 'email', 'role', 'action'].map(
                  (item) => (
                    <th key={item} className="text-center">
                      {item}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              <ShowUser />
            </tbody>
          </Table>
        </section>
      </div>
    </>
  );
}

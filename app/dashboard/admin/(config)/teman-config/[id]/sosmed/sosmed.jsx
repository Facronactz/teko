'use client';

import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import useSWR from 'swr';

export default function ListSosmed({ fetcher, id }) {
  const platform = useRef();
  const nama = useRef();
  const url = useRef();
  const { data: sosmed } = useSWR(fetcher.url, fetcher.fetcher, fetcher.swrConfig);

  // function to delete sosmed
  async function deleteSosmed(_id) {
    // make swal to confirm delete
    const confirm = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });
    // if user confirm delete
    if (confirm.isConfirmed) {
      // delete data
      await fetcher.delete(_id);
      // show swal
      Swal.fire({
        icon: 'success',
        title: 'Yaay...',
        text: 'Data berhasil dihapus',
        confirmButtonColor: '#315343',
      });
    }
  }

  // function to edit sosmed
  async function editSosmed(_id) {
    // make swal to edit
    const confirm = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang diedit tidak dapat dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, edit',
      cancelButtonText: 'Batal',
    });
    // if user confirm edit
    if (confirm.isConfirmed) {
      // edit data
      await fetcher.put({
        nama: nama.current.value,
        platform: platform.current.value,
        url: url.current.value,
        lembaga: id,
      }, _id);
      // show swal
      Swal.fire({
        icon: 'success',
        title: 'Yaay...',
        text: 'Data berhasil diedit',
        confirmButtonColor: '#315343',
      });
    }
  }

  return (
    <>
      {sosmed && sosmed?.map((item) => (
        <tr key={item.id}>
          <td className="text-center border border-brand">
            <input
              ref={platform}
              defaultValue={item.platform}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="text-center border border-brand">
            <input
              ref={nama}
              defaultValue={item.nama}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="text-center border border-brand">
            <input
              ref={url}
              defaultValue={item.url}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="flex flex-row justify-center">
            {/* TODO tolong di style */}
            <Button
              onClick={() => editSosmed(item.id)}
              className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteSosmed(item.id)}
              className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
            >
              Remove
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}

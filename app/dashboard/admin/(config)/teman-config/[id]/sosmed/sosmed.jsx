'use client';

import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import useSWR from 'swr';
import { FiEdit3, FiDelete } from 'react-icons/fi';

export default function ListSosmed({ fetcher, id }) {
  const platform = useRef();
  const nama = useRef();
  const url = useRef();
  const { data: sosmed } = useSWR(
    fetcher.url,
    fetcher.fetcher,
    fetcher.swrConfig,
  );

  // function to delete sosmed
  async function deleteSosmed(_id) {
    // make swal to confirm delete
    const confirm = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Ya, edit',
      cancelButtonText: 'Batal',
    });
    // if user confirm edit
    if (confirm.isConfirmed) {
      // edit data
      await fetcher.put(
        {
          nama: nama.current.value,
          platform: platform.current.value,
          url: url.current.value,
          lembaga: id,
        },
        _id,
      );
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
      {sosmed &&
        sosmed?.map((item) => (
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
              <Button
                onClick={() => editSosmed(item.id)}
                className="bg-brand text-white border-brand rounded ml-3 my-auto py-2 px-3 flex"
              >
                <FiEdit3 className="h-[25px] w-[50px] mr-2 text-white" />
                Edit
              </Button>
              <Button
                onClick={() => deleteSosmed(item.id)}
                className="bg-danger text-white border-danger text-center rounded ml-3 my-auto p-2 flex"
              >
                <FiDelete className="h-[25px] w-[50px] mr-2 text-white" />
                Hapus
              </Button>
            </td>
          </tr>
        ))}
    </>
  );
}

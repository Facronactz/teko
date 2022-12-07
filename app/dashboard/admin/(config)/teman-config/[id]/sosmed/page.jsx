'use client';

import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';
import Swal from 'sweetalert2';

// TODO masih UI belum ada fungsi sama sekali (ubah berdasar id(karena dashboard teman), fungsi post(add) kegiatan blm berfungsi)

export default function New({ fetcher }) {
  const provider = useRef();
  const name = useRef();
  const url = useRef();

  async function createMenu() {
    const createData = {
      name: name.current.value,
      provider: provider.current.value,
      url: url.current.value,
    };
    await fetcher.post(createData);
    Swal.fire({
      icon: 'success',
      title: 'Yaay...',
      text: 'Data berhasil ditambahkan',
      confirmButtonColor: '#315343',
    });
  }

  return (
    <>
      <table className="m-auto">
        <tr className="text-center">
          <th>provider</th>
          <th>nama</th>
          <th>url</th>
          <th>aksi</th>
        </tr>
        <tr>
          <td className="text-center border border-brand">
            <input
              ref={provider}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="text-center border border-brand">
            <input
              ref={name}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="text-center border border-brand">
            <input
              ref={url}
              type="text"
              className="text-center border-brand rounded outline-none"
            />
          </td>
          <td className="flex flex-row justify-center">
            <Button
              onClick={createMenu}
              className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
            >
              <GoPlus className="h-[30px] w-[70px] text-white" />
            </Button>
          </td>
        </tr>
      </table>
    </>
  );
}

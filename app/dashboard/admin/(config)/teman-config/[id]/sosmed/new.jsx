'use client';

import { GoPlus } from 'react-icons/go';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function NewSosmed({ fetcher, id }) {
  const platform = useRef();
  const nama = useRef();
  const url = useRef();

  async function createSosmed() {
    const createData = {
      nama: nama.current.value,
      platform: platform.current.value,
      url: url.current.value,
      lembaga: id,
    };
    if (
      nama.current.value === '' ||
      platform.current.value === '' ||
      url.current.value === ''
    ) {
      Swal.fire({
        icon: 'error',
        text: 'Data tidak boleh ada yang kosong',
        confirmButtonColor: '#315343',
      });
    } else {
      await fetcher.post(createData);
      Swal.fire({
        icon: 'success',
        title: 'Yaay...',
        text: 'Data berhasil ditambahkan',
        confirmButtonColor: '#315343',
      });
    }
  }

  return (
    <>
      <tr>
        <td className="text-center border border-brand">
          <input
            ref={platform}
            type="text"
            className="text-center border-brand rounded outline-none"
          />
        </td>
        <td className="text-center border border-brand">
          <input
            ref={nama}
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
            onClick={createSosmed}
            className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
          >
            <GoPlus className="h-[30px] w-[70px] text-white" />
          </Button>
        </td>
      </tr>
    </>
  );
}

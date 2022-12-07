/* eslint-disable no-return-assign */

import { useRef } from 'react';

import { Button } from 'react-bootstrap';

import { GoCheck } from 'react-icons/go';
import { ImCross } from 'react-icons/im';

import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Menus({ fetcher }) {
  const edittedContent = useRef([]);
  const router = useRouter();

  const { data, error } = useSWR(
    fetcher.url,
    fetcher.fetcher,
    fetcher.swrConfig,
  );

  async function updateMenu(id, name, href) {
    const updateData = {
      name,
      href,
    };
    await fetcher.put(updateData, id);
    Swal.fire({
      icon: 'success',
      text: 'Data berhasil diubah',
      confirmButtonColor: '#315343',
    });
    router.refresh();
  }

  async function deleteMenu(id) {
    // TODO tambahkan konfirmasi sebelum hapus
    await fetcher.delete(id);
    Swal.fire({
      icon: 'success',
      text: 'Data berhasil dihapus',
      confirmButtonColor: '#315343',
    });
    router.refresh();
  }

  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        <td className="text-center">
          {' '}
          <Skeleton />
        </td>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="flex flex-row justify-center">
          <Button className="bg-brand text-white border-brand rounded ml-3 my-auto p-2">
            <GoCheck className="h-[30px] w-[70px] text-white" />
          </Button>
          <Button className="bg-white border-brand ml-3">
            <ImCross className="h-[25px] w-[70px] text-danger" />
          </Button>
        </td>
      </tr>
    );
  }
  return data.map((menu) => (
    <tr key={menu.id}>
      <td className="text-center">{menu.id}</td>
      <td
        className="text-center"
        contentEditable="true"
        ref={(x) => (edittedContent[menu.name] = x)}
        required
      >
        {menu.name}
      </td>
      <td
        className="text-center"
        contentEditable="true"
        ref={(x) => (edittedContent[menu.href] = x)}
        required
      >
        {menu.href}
      </td>
      <td className="flex flex-row justify-center">
        <Button
          onClick={() => updateMenu(
            menu.id,
            edittedContent[menu.name].innerText,
            edittedContent[menu.href].innerText,
          )
          }
          className="bg-brand text-white border-brand rounded ml-3 my-auto p-2"
        >
          <GoCheck className="h-[30px] w-[70px] text-white" />
        </Button>
        <Button
          onClick={() => deleteMenu(menu.id)}
          className="bg-white border-brand ml-3"
        >
          <ImCross className="h-[25px] w-[70px] text-danger" />
        </Button>
      </td>
    </tr>
  ));
}

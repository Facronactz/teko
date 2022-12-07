import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function New({ fetcher }) {
  const name = useRef();
  const href = useRef();
  const router = useRouter();

  async function createMenu() {
    if (name.current.value === '' || href.current.value === '') {
      Swal.fire({
        icon: 'error',
        text: 'Data tidak boleh ada yang kosong',
        confirmButtonColor: '#315343',
      });
    } else {
      const createData = {
        name: name.current.value,
        href: href.current.value,
      };
      await fetcher.post(createData);
      Swal.fire({
        icon: 'success',
        title: 'Yaay...',
        text: 'Data berhasil ditambahkan',
        confirmButtonColor: '#315343',
      });
      router.refresh();
    }
  }

  return (
    <tr>
      <td className="text-center">-</td>
      <td className="text-center">
        <input
          ref={name}
          type="text"
          className="text-center outline-brand rounded outline-none"
        />
      </td>
      <td className="text-center">
        <div>
          <input
            ref={href}
            type="text"
            className="text-center outline-brand rounded outline-none"
          />
        </div>
      </td>
      <td className="flex flex-row justify-center">
        <div>
          <Button
            onClick={createMenu}
            className="bg-brand text-white rounded ml-3 my-auto p-2"
          >
            <GoPlus className="h-[30px] w-[70px] text-white" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

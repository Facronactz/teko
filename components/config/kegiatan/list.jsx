import { Table } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Fetcher from '@teko/helpers/fetcher';
import Swal from 'sweetalert2';
import { useRef } from 'react';

export default function KegiatanItemConfig({ data, lembaga, role }) {
  const fetcher = new Fetcher('kegiatan');
  const router = useRouter();
  const aktif = useRef(null);
  const deleteKegiatan = async (id) => {
    const swal = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
    if (swal.isConfirmed) {
      const resp = fetcher.delete(id);
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
    router.refresh();
  };

  const swapActive = async (id) => {
    const swal = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
    if (!swal.isConfirmed) {
      aktif.current.checked = !aktif.current.checked;
    }
    if (swal.isConfirmed) {
      const resp = await fetcher.put({
        active: aktif.current.checked,
      }, id);
      if (!resp.error) {
        Swal.fire({
          icon: 'success',
          title: 'Oke,',
          text: 'Kegiatan telah dinonaktifkan.',
          confirmButtonColor: '#315343',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal,',
          text: 'Kegiatan gagal dinonaktifkan.',
          confirmButtonColor: '#315343',
        });
      }
      router.refresh();
    }
  };

  return (
    <Table bordered hover className="table-auto">
      <thead className="text-center">
        <tr>
          <th>No</th>
          <th>Nama Kegiatan</th>
          {lembaga && <th>Lembaga</th>}
          <th>Tanggal</th>
          <th>Aktif</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="text-center align-middle">{index + 1}</td>
            <td className="text-center align-middle">{item.nama}</td>
            {lembaga && (
              <td className="text-center align-middle">{item.lembaga.nama}</td>
            )}
            <td className="text-center align-middle">{Date(item.tanggal)}</td>
            <td className="text-center align-middle">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg m-auto"
                ref={aktif}
                defaultChecked={item.active}
                onChange={() => swapActive(item.id)}
              />
            </td>

            <td className="flex flex-row justify-center py-4">
              <Link
                href={`/dashboard/${role}/kegiatan-config/${item.id}`}
                className="bg-brand text-lg my-auto no-underline text-white rounded px-3 py-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteKegiatan(item.id)}
                className="bg-white border border-brand px-3 py-2 rounded my-auto ml-4"
              >
                <ImCross className="h-[30px] xxl:h-[25px] w-auto m-auto text-danger" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
